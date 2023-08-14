import { Injectable } from "@angular/core";
import { deepClone } from "../helpers/object-utils";
import { IResinFeature } from "../helpers/models/IResinFeatureModel";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { combineLatest, combineLatestWith, distinctUntilChanged, map, shareReplay } from "rxjs/operators";

export interface ProductList {
  rings: Array<IResinFeature>,
  earings: Array<IResinFeature>,
  bracelets: Array<IResinFeature>,
  bangles: Array<IResinFeature>,
  bangle_sets: Array<IResinFeature>,
  halfsets: Array<IResinFeature>,
  fullsets: Array<IResinFeature>,
  pendants: Array<IResinFeature>,
  necklaces: Array<IResinFeature>,
  chains: Array<IResinFeature>,
  customized_sets: Array<IResinFeature>
}

const initialState: ProductList = {
  rings: [],
  earings: [],
  bracelets: [],
  bangles: [],
  bangle_sets: [],
  halfsets: [],
  fullsets: [],
  pendants: [],
  necklaces: [],
  chains: [],
  customized_sets: []
};

let internalState: ProductList = deepClone(initialState);
let cache$: Observable<any>;

@Injectable({
  providedIn: 'root',
})
export class ProductStore {

  products$!: Observable<[]>;

  protected store = new BehaviorSubject<ProductList>(internalState);
  protected state$ = this.store.asObservable();

  rings$!: Observable<IResinFeature[]>;
  earings$!: Observable<IResinFeature[]>;
  bracelets$!: Observable<IResinFeature[]>;
  bangles$!: Observable<IResinFeature[]>;
  bangle_sets$!: Observable<IResinFeature[]>;
  halfsets$!: Observable<IResinFeature[]>;
  fullsets$!: Observable<IResinFeature[]>;
  pendants$!: Observable<IResinFeature[]>;
  necklaces$!: Observable<IResinFeature[]>;
  chains$!: Observable<IResinFeature[]>;
  customized_sets$!: Observable<IResinFeature[]>;

  constructor() {
    this.rings$ = this.state$.pipe(map(state => state.rings), distinctUntilChanged());
    this.earings$ = this.state$.pipe(map(state => state.earings), distinctUntilChanged());
    this.bracelets$ = this.state$.pipe(map(state => state.bracelets), distinctUntilChanged());
    this.bangles$ = this.state$.pipe(map(state => state.bangles), distinctUntilChanged());
    this.bangle_sets$ = this.state$.pipe(map(state => state.bangle_sets), distinctUntilChanged());
    this.halfsets$ = this.state$.pipe(map(state => state.halfsets), distinctUntilChanged());
    this.fullsets$ = this.state$.pipe(map(state => state.fullsets), distinctUntilChanged());
    this.pendants$ = this.state$.pipe(map(state => state.pendants), distinctUntilChanged());
    this.necklaces$ = this.state$.pipe(map(state => state.necklaces), distinctUntilChanged());
    this.chains$ = this.state$.pipe(map(state => state.chains), distinctUntilChanged());
    this.customized_sets$ = this.state$.pipe(map(state => state.customized_sets), distinctUntilChanged());

    this.products$ = this.rings$.pipe(
      combineLatestWith(
        this.earings$,
        this.bracelets$,
        this.bangles$,
        this.bangle_sets$,
        this.halfsets$,
        this.fullsets$,
        this.pendants$,
        this.necklaces$,
        this.chains$,
        this.customized_sets$
      ),
      map(([rings, earings, bracelets, bangles, bangle_sets, halfsets, fullsets, pendants, necklaces, chains, customized_sets]) => ({
        ...rings, ...earings, ...bracelets, ...bangles, ...bangle_sets, ...halfsets, ...fullsets, ...pendants, ...necklaces, ...chains, customized_sets
      }))
    );

  }

  protected updateState(state: ProductList, category: string): void {
    console.log("state", state)
    console.log("category", category)
    this.store.next(internalState = state);
  }

  public setState(data: any, category: string): void {
    cache$ = of(data).pipe(shareReplay(1));
    this.updateState(data, category);
  }

  get products(): any {
    return this.store.getValue();
  }

  public getProducts(): Observable<ProductList> {
    return this.store;
  }
}
