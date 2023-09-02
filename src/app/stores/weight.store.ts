import { Injectable, OnDestroy } from "@angular/core";
import { ObjectMap } from "../helpers/models/IResinFeatureModel";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, Subscription } from "rxjs";
import { combineLatestWith, map, tap } from "rxjs/operators";
import { ComponentType } from "../helpers/contants/ComponentType";
import { ProductStore } from "./product.store";


@Injectable({
  providedIn: 'root',
})
export class WeightStore  implements OnDestroy{

  private weightStore = new BehaviorSubject<any>([]);
  public weightState$ = this.weightStore.asObservable();

  private weightSub: Subscription | undefined;

  constructor(private productStore: ProductStore) {
  }

  ngOnDestroy(): void {
    if (this.weightSub) {
      this.weightSub.unsubscribe();
    }
  }

  public updateWeightState(data: any): void {
    console.log(data)
    this.weightStore.next(data);
  }

  //Returns products
  get weight(): ObjectMap[] {
    return this.weightStore.getValue();
  }

  public setWeight(isSetComponent: boolean): void {
    if (this.weightSub) {
      this.weightSub.unsubscribe();
    }

    this.weightSub = this.combineStateWithAnyState$(this.weightState$)
    .pipe(
      map(([state, weight]) => this.mergeStateWithWeight(state, weight, isSetComponent)),
      tap(data => this.productStore.updateState(data))
    )
    .subscribe();
  }

  private combineStateWithAnyState$(coupleState:Observable<any>): Observable<[any[], any[]]> {
    return this.productStore.state$.pipe(
      combineLatestWith(coupleState)
    );
  }

  private mergeStateWithWeight(state: any[], weight: any[], isSetComponent: boolean): any[] {
    if (weight.length === 0 || state.length === 0) {
      return state;
    }

    return state.map((stateObj: any) => {
      const componentType = stateObj.componentType;
      const newArrForWeight = weight.map((item: any) => {
        //Bazen ismin önune -R konabiliyor single comp için
        if(!isSetComponent) {
          const suffixes = ["-R", "-E", "-BK", "BL", "P", "N"];
          const regex = new RegExp(`(${suffixes.join('|')})$`);
          if(regex && componentType === ComponentType.SINGLE_COMPONENT) {
            item.KOD = item.KOD.replace(regex, '');
            return item;
          }
        }
          return item;
      });
      const matchingWeightItem = newArrForWeight.find((weightObj: any) => weightObj.KOD === stateObj.designCode);

      if (matchingWeightItem) {
        const keyNumber: number = matchingWeightItem['21ayar'] / 100;
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
  }

  public importWeightData(data: any) {
    //Fix empty value or No KOD issue
    const filteredArray = data.filter((item: ObjectMap) => {
      return Object.keys(item).length > 0 && item.hasOwnProperty("KOD");
    });

    const modifiedData = this.modifyWeightData(filteredArray);
    this.updateWeightState(modifiedData)
  }

  private modifyWeightData(data: ObjectMap[], suffix?: string): ObjectMap[] {
    //Fix TOPLAM issue
    const updatedArray = this.updateKODValues(data);

    const modifiedArray = updatedArray.map(item => {
      const modifiedItem:any = {};
      for (const key in item) {
          if (item.hasOwnProperty(key)) {
            //Replace the space eg. '14 ayar'
              const newKey: any = key.replace(/\s+/g, '');
              modifiedItem[newKey] = item[key];
          }
      }
      return modifiedItem;
    });

    //This regex for making 2 groups with non-digit and digit groups. eg.FSP010 => FSP10
    for (var i = 0; i < modifiedArray.length; i++) {
      var kodValue = modifiedArray[i].KOD;

      var parts = kodValue.split("-");
      const match = parts[0].match(/(\D+)(\d+)/);
      if (match) {
        const word = match[1];
        let number = Number(match[2]);
        let suffix = parts[1];
        // if(suffix) {
        //   switch(suffix) {
        //     case 'P':
        //       suffix = '';
        //       break;
        //     case 'E':
        //       suffix = '';
        //       break;
        //     case 'R':
        //       suffix = '';
        //       break;
        //     case 'BK':
        //       suffix = '';
        //       break;
        //     case 'BL':
        //       suffix = '';
        //       break;
        //     case 'N':
        //       suffix = '';
        //       break;
        //   }
        // }

          if (number > 9) {
              const kodWithoutZero = word + number + (suffix ? ('-' + suffix) : '');
              if (kodWithoutZero.length !== modifiedArray[i].KOD.length) {
                modifiedArray[i].KOD = kodWithoutZero;
            }

          }
      }
  }
    return modifiedArray;
  }

   updateKODValues(inputArray: any[]): any[] {
    //This method is for if KOD is 'TOPLAM'
    const regex = /-.*/;
    for (let i = 0; i < inputArray.length; i++) {
      const currentItem = inputArray[i];
      if (currentItem.KOD === "TOPLAM") {
          inputArray[i].KOD = inputArray[i-1].KOD.replace(regex, '');;
      }
    }

    return inputArray;
  }
}
