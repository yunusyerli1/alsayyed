import { Injectable, OnDestroy } from "@angular/core";
import { IResinFeature, ObjectMap } from "../helpers/models/IResinFeatureModel";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, Subscription } from "rxjs";
import { combineLatestWith, filter, map, tap } from "rxjs/operators";
import { ComponentType } from "../helpers/contants/ComponentType";
import { ProductStore } from "./product.store";


@Injectable({
  providedIn: 'root',
})
export class RelationStore {

  private relationStore = new BehaviorSubject<any>([]);
  public relationState$ = this.relationStore.asObservable();

  constructor(private productStore: ProductStore) {
  }

  private updateRelationState(data: any): void {
    this.relationStore.next(data);
  }

  //Returns products
  get state(): any[] {
    return this.relationStore.getValue();
  }
  //Returns data for exporting
  get exportedData(): any {
    const relationships = this.state;
    const newArr = relationships.map((relation: any) => {
      return {
        'Name(Dont Import)': relation.name,
        'External ID': relation.externalId,
        'Related Combined': relation.combinedRelated,
      }
    })
    return newArr
  }

  setRelationships() {
    const products = this.productStore.state;
    const setArr = products.filter((product:any) => product.componentType === ComponentType.SET);
    const setCompArr= products.filter((product:any) => product.componentType === ComponentType.SET_COMPONENT);
    const filteredItems:any = []

    setArr.forEach((setItem: IResinFeature) => {
      setCompArr.forEach((setCompItem: IResinFeature) => {
        let isIncluded = setCompItem.designCode.includes(setItem.designCode);
        if(isIncluded) {

          filteredItems.push(
            {
              designCode: setCompItem.designCode,
              externalId: setCompItem.externalId
            })
        }
      });

      return filteredItems.push({
        designCode: setItem.designCode,
        externalId: setItem.externalId
      })
    })

    const relatedData: any = {};

    for (const item of filteredItems) {
      const { designCode, externalId } = item;
      const baseCode = designCode.split('-')[0];

      const relatedObj = filteredItems.filter( (item : any) => item.designCode !== designCode && item.designCode.includes(baseCode))
      relatedData[designCode] = {
        designCode,
        externalId,
        related: relatedObj
      };
    }

    const modifiedArray = Object.keys(relatedData).map((key:any) => {
      return {
        name: relatedData[key].designCode,
        externalId: relatedData[key].externalId,
        combinedRelated: relatedData[key].related.map((relatedItem: any) => relatedItem.externalId).join(', ')
      }
    })
    this.updateRelationState(modifiedArray);
  }


}
