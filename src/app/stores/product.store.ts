import { Injectable } from "@angular/core";
import { deepClone } from "../helpers/object-utils";
import { ObjectMap, IResinFeature } from "../helpers/models/IResinFeatureModel";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { combineLatestWith, distinctUntilChanged, map, shareReplay, tap } from "rxjs/operators";


const initialState: IResinFeature[] = [];

let internalState: IResinFeature[] = deepClone(initialState);

@Injectable({
  providedIn: 'root',
})
export class ProductStore {

  private store = new BehaviorSubject<IResinFeature[]>(internalState);
  public state$ = this.store.asObservable();

  private weightStore = new BehaviorSubject<any>([]);
  public weightState$ = this.weightStore.asObservable();

  protected cache$: Observable<IResinFeature[]> | null = null;

  public vm$!: Observable<any>;
  public vm: any;

  init(): void {

    if(!internalState.length) {
      internalState = this.getLocalStorage();
      this.addToState(internalState);
    }
    console.log("internalState", internalState)
  }

  private updateState(data: IResinFeature[]): void {
    console.log(data)
    this.cache$ = of(data).pipe(shareReplay(1));
    this.store.next(internalState = data);
    this.setLocalStorage(data);
  }

  private updateWightState(data: any): void {
    this.weightStore.next(data);
  }

  public addToState(data: IResinFeature[]): void {
    const currentList = this.store.getValue();
    const updatedArray = [...currentList, ...data];
    this.updateState(updatedArray);
  }

  public deleteFromState(category: any) {
    const currentList = this.store.getValue();
    const filteredArray = currentList.filter((object) => object.designBrand !== category);
    console.log(filteredArray)
    this.updateState(filteredArray);

  }

  private setLocalStorage(data: IResinFeature[]) {
    localStorage.setItem("products", JSON.stringify(data));
  }

  private getLocalStorage() {
    const storedData = localStorage.getItem("products");
    return storedData ? JSON.parse(storedData) : [];
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
    this.state$.pipe(
      combineLatestWith(this.weightState$),
      map(([state, weight]) => {
        if (weight.length === 0) {
          return state;
        }
        const mergedData = state.map((stateObj: any) => {
          const matchingWeightItem = weight.filter((weightObj: any) => weightObj.KOD === stateObj.designCode);
          if (matchingWeightItem.length > 0) {
            let keyNumber: number = matchingWeightItem[0]['21ayar'] / 100;
            return {
              ...stateObj,
              weightResin: (keyNumber / 12).toFixed(4),
              weight22Kt: (keyNumber * 1.038).toFixed(4),
              weight21Kt: (keyNumber).toFixed(4),
              weight18Kt: (keyNumber * 0.882).toFixed(4),
              weight14Kt: (keyNumber * 0.765).toFixed(4),
            };
          }
          return stateObj;
        });
        return mergedData;
    }),
      tap(data => this.updateState(data))
    ).subscribe()
  }

  public sendWeightData(data: any) {
    const trimmedData = this.trimData(data);
    this.updateWightState(trimmedData)
    // this.state.forEach(product => {

    // });
    console.log(data);
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
