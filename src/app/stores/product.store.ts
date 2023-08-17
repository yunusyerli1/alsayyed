import { Injectable } from "@angular/core";
import { deepClone } from "../helpers/object-utils";
import { IResinFeature } from "../helpers/models/IResinFeatureModel";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { shareReplay } from "rxjs/operators";


const initialState: IResinFeature[] = [];

let internalState: IResinFeature[] = deepClone(initialState);

@Injectable({
  providedIn: 'root',
})
export class ProductStore {

  private store = new BehaviorSubject<IResinFeature[]>(internalState);
  public state$ = this.store.asObservable();

  protected cache$: Observable<IResinFeature[]> | null = null;

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

  setLocalStorage(data: IResinFeature[]) {
    localStorage.setItem("products", JSON.stringify(data));
  }

  getLocalStorage() {
    const storedData = localStorage.getItem("products");
    return storedData ? JSON.parse(storedData) : [];
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

}
