import { Injectable, OnDestroy } from "@angular/core";
import { deepClone } from "../helpers/object-utils";
import { ObjectMap, IResinFeature } from "../helpers/models/IResinFeatureModel";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, Subscription, of } from "rxjs";
import { combineLatestWith, first, map, shareReplay, take, tap } from "rxjs/operators";
import { ComponentType } from "../helpers/contants/ComponentType";

const initialState: IResinFeature[] = [];

let internalState: IResinFeature[] = deepClone(initialState);

@Injectable({
  providedIn: 'root',
})
export class ProductStore  implements OnDestroy{

  private store = new BehaviorSubject<IResinFeature[]>(internalState);
  public state$ = this.store.asObservable();

  private weightStore = new BehaviorSubject<any>([]);
  public weightState$ = this.weightStore.asObservable();

  private exportedDataState = new BehaviorSubject<IResinFeature[]>(internalState);
  public exportedDataState$ = this.exportedDataState.asObservable();

  protected cache$: Observable<IResinFeature[]> | null = null;

  private weightSub: Subscription | undefined;

  ngOnDestroy(): void {
    if (this.weightSub) {
      this.weightSub.unsubscribe();
    }
  }

  init(): void {

    if(!internalState.length) {
      internalState = this.getLocalStorage();
      this.addToState(internalState);
    }
    console.log("internalState", internalState)
  }

  private updateState(data: IResinFeature[]): void {
    this.cache$ = of(data).pipe(shareReplay(1));
    this.store.next(internalState = data);
    this.setLocalStorage(data);
  }

  private updateWightState(data: any): void {
    this.weightStore.next(data);
  }

  public addToState(data: IResinFeature[]): void {
    console.log(data)
    const currentList = this.store.getValue();
    const updatedArray = [...currentList, ...data];
    this.updateState(updatedArray);
  }

  public deleteFromState(category: any) {
    const currentList = this.store.getValue();
    const filteredArray = currentList.filter((object) => object.designBrand !== category);
    this.updateState(filteredArray);

  }

  private setLocalStorage(data: IResinFeature[]) {
    localStorage.setItem("products", JSON.stringify(data));
  }

  private getLocalStorage() {
    const storedData = localStorage.getItem("products");
    return storedData ? JSON.parse(storedData) : [];
  }

  //Returns data for exporting
  get exportedData(): any {
    const products = this.state;
    console.log(products)
    const newArr = products.map((product: IResinFeature) => {
      return {
        'Design Category': product.designCategory,
        'Design Brand': product.designBrand,
        'Design Code': product.designCode,
        'Product Attributes/Attribute': product.attribute,
        'Product Attributes/Attribute/Value': product.attributeValue,
        'Raw material': product.rawMaterial,
        'Resin Wt. (Gr)': product.weightResin,
        '22 Kt Gold Wt. (Gr)': product.weight22Kt,
        '21 Kt Gold Wt. (Gr)': product.weight21Kt,
        '18 Kt Gold Wt. (Gr)': product.weight18Kt,
        '14kt Gold Wt. (Gr)': product.weight14Kt,
        'Printable file Unit price': product.pricePrintable,
        'Resin Gram price': product.priceResin,
        'Gold Gram price': product.priceGold
      }
    })
    return newArr
  }


  //Returns products
  get weight(): ObjectMap[] {
  return this.weightStore.getValue();
  }

  //Returns products
  get state(): IResinFeature[] {
    return this.store.getValue();
  }

  //Returns observable products
  public getProducts(): Observable<IResinFeature[]> {
    return this.store;
  }

  public isCached(): boolean {
    return this.cache$ !== null;
  }

  public setWeight() {
    if (this.weightSub) {
      this.weightSub.unsubscribe();
    }

    this.weightSub = this.state$.pipe(
      combineLatestWith(this.weightState$),
      map(([state, weight]) => {
        if (weight.length === 0) {
          return state;
        }

        if (state.length === 0) {
          return state;
        }

        const mergedData = state.map((stateObj: any) => {
          const componentType = stateObj.componentType;
          const newArrForWeight = weight.map( (item: any) => {
            const dashIndex = item.KOD.indexOf('-');
            if (dashIndex !== -1 && componentType === ComponentType.SINGLE_COMPONENT) {
              return {
                ...item,
                KOD: item.KOD.slice(0, dashIndex)
              }
            }
            return item;
          });
          const matchingWeightItem = newArrForWeight.filter((weightObj: any) => weightObj.KOD === stateObj.designCode);
          if (matchingWeightItem.length > 0) {
            let keyNumber: number = matchingWeightItem[0]['21ayar'] / 100;
            return {
              ...stateObj,
              weightResin: (keyNumber / 12).toFixed(2),
              weight22Kt: (keyNumber * 1.038).toFixed(2),
              weight21Kt: (keyNumber).toFixed(2),
              weight18Kt: (keyNumber * 0.882).toFixed(2),
              weight14Kt: (keyNumber * 0.765).toFixed(2),
              pricePrintable: 2.0,
              priceResin: 6.0,
              priceGold: 3.0
            };
          }
          return stateObj;
        });
        return mergedData;
    }),
      tap(data => this.updateState(data))
    ).subscribe();
  }

  public sendWeightData(data: any) {
    const trimmedData = this.trimData(data);
    console.log(trimmedData)
    this.updateWightState(trimmedData)
  }

  private trimData(data: ObjectMap[]): ObjectMap[] {
    const filteredArray = data.filter((item: ObjectMap) => {
      return Object.keys(item).length > 0 && item.hasOwnProperty("KOD");
    });
    const modifiedArray = filteredArray.map(item => {
      const modifiedItem:any = {};
      for (const key in item) {
          if (item.hasOwnProperty(key)) {
              const newKey:any = key.replace(/\s+/g, "");
              modifiedItem[newKey] = item[key];

              const kod = item['KOD'];
              const match = kod.match(/(\D+)(\d+)/);
              if (match) {
                const word = match[1];
                const number = parseInt(match[2], 10);
                if (number > 9) {
                    modifiedItem['KOD'] = word + number;

                }
              }
          }
      }
      return modifiedItem;
    });

    return modifiedArray;
  }
}
