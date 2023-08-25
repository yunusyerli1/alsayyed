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
export class ExternalIdStore  implements OnDestroy{

  private externalIdStore = new BehaviorSubject<any>([]);
  public externalIdState$ = this.externalIdStore.asObservable();

  private externalSub: Subscription | undefined;

  constructor(private productStore: ProductStore) {
  }

  ngOnDestroy(): void {
    if (this.externalSub) {
      this.externalSub.unsubscribe();
    }
  }

  private updateExtIdState(data: any): void {
    this.externalIdStore.next(data);
  }

  private combineStateWithAnyState$(coupleState:Observable<any>): Observable<[any[], any[]]> {
    return this.productStore.state$.pipe(
      combineLatestWith(coupleState)
    );
  }

  private mergeStateWithExternalIds(state: any[], externalIds: any[]): any[] {
    if (externalIds.length === 0 || state.length === 0) {
      return state;
    }

    return state.map((stateObj: any) => {
      const matchingExtItem = externalIds.find((extObj: any) => extObj.Name === stateObj.designCode);
      if (matchingExtItem) {
        return {
          ...stateObj,
          externalId: matchingExtItem['ExternalID']
        };
      }

      return stateObj;
    });
  }

  public setExternalIds(): void {
    if (this.externalSub) {
      this.externalSub.unsubscribe();
    }

    this.externalSub = this.combineStateWithAnyState$(this.externalIdState$)
    .pipe(
      map(([state, externalIds]) => this.mergeStateWithExternalIds(state, externalIds)),
      tap(data => this.productStore.updateState(data))
    )
    .subscribe();
  }

  public importExternalIds(data: any) {
    const modifiedData = this.modifyExternalIds(data);
    this.updateExtIdState(modifiedData)
  }

  private modifyExternalIds(data: ObjectMap[]) {
    const modifiedArray = data.map(item => {
      const modifiedItem:any = {};
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
            const newKey:any = key.replace(/\s+/g, '');
            modifiedItem[newKey] = item[key];
        }
      }
      return modifiedItem;
    });
    return modifiedArray;
  }

}
