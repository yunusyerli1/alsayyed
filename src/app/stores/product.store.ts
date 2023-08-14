import { Injectable } from "@angular/core";
import { deepClone } from "../helpers/object-utils";
import { IResinFeature } from "../helpers/models/IResinFeatureModel";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { combineLatest, combineLatestWith, distinctUntilChanged, map, shareReplay } from "rxjs/operators";


const initialState: IResinFeature[] = [];

let internalState: IResinFeature[] = deepClone(initialState);
let cache$: Observable<IResinFeature[]>;

@Injectable({
  providedIn: 'root',
})
export class ProductStore {

  products$!: Observable<IResinFeature[]>;

  protected store = new BehaviorSubject<IResinFeature[]>(internalState);
  protected state$ = this.store.asObservable();

  constructor() {
    this.products$ = this.getProducts();
  }

  protected updateState(data: IResinFeature[], category: string): void {

    this.store.next(internalState = data);
  }

  public setState(data: IResinFeature[], category: string): void {
    const currentValue = this.store.getValue();
    const updatedArray = [...currentValue, ...data];
    cache$ = of(updatedArray).pipe(shareReplay(1));
    this.updateState(updatedArray, category);
  }

  get products(): IResinFeature[] {
    return this.store.getValue();
  }

  public getProducts(): Observable<IResinFeature[]> {
    return this.store;
  }

  public isCached(): boolean {
    return cache$ !== null;
}

}
