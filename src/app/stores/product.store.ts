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
      this.setState(internalState);
    }
    console.log("internalState", internalState)
  }

  protected updateState(data: IResinFeature[]): void {
    this.store.next(internalState = data);
  }

  public setState(data: IResinFeature[]): void {
    const currentValue = this.store.getValue();
    const updatedArray = [...currentValue, ...data];
    this.cache$ = of(updatedArray).pipe(shareReplay(1));
    this.updateState(updatedArray);
    this.setLocalStorage(updatedArray);
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
