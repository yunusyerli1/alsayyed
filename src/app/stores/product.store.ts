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

  public updateState(data: IResinFeature[]): void {
    this.cache$ = of(data).pipe(shareReplay(1));
    this.store.next(internalState = data);
    this.setLocalStorage(data);
  }

  public addToState(data: IResinFeature[]): void {
    const currentList = this.store.getValue();
    const updatedArray = [...currentList, ...data];
    this.updateState(updatedArray);
  }

  public deleteCollection(category: any) {
    const currentList = this.store.getValue();
    const filteredArray = currentList.filter((object) => object.designBrand !== category);
    this.updateState(filteredArray);
  }

  public deleteItem(designCode: string) {
    const currentList = this.store.getValue();
    const filteredArray = currentList.filter((object) => object.designCode !== designCode);
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
    const newArr = products.map((product: IResinFeature) => {
      return {
        'Design Category': product.designCategory,
        'Design Brand': product.designBrand,
        'Design Code': product.designCode,
        'Website Product Category / External Id': product.productCategory,
        'Ext Id': product.externalId,
        'Product Attributes/Attribute': product.attribute,
        'Product Attributes/Attribute/Value': product.attributeValue,
        'Raw material': product.rawMaterial,
        'Tags': product.style,
        'Product Type': 'Consumable',
        'Unit of Measure/ID': 'Unit(s)',
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

  //Returns karat data for exporting
  get exportedKaratData(): any {
    const products = this.state;
    const newArr = products.map((product: IResinFeature) => {
      return {
        'External ID': product.externalId,
        'Name': product.designCode,
        'Product Attributes/Attribute': 'Karat',
        'Product Attributes/Attribute/Value': '14,18,21,22',
      }
    })
    return newArr
  }

  //Returns order type data for exporting
  get exportedOrderTypeData(): any {
    const products = this.state;
    const newArr = products.map((product: IResinFeature) => {
      return {
        'External ID': product.externalId,
        'Name': product.designCode,
        'Product Attributes/Attribute': 'Order Type',
        'Product Attributes/Attribute/Value': '3D Printed Resin,Printable Designs,Finished Jewelry',
      }
    })
      return newArr
  }

  //Returns image import one data for exporting
  get exportedImageImportData(): any {
  const products = this.state;
  const newArr = products.map((product: IResinFeature) => {
    let category = product.category + 's';
    let imgFormat = '-1.jpg';
    switch(product.category) {
      case 'Bangle':
        category = 'Bracelets';
        break;
      case 'Bangle Set':
        category = 'Bracelet';
        break;
      case 'Halfset':
        category = 'Halfsets';
        imgFormat = '.jpg';
        break;
      default:
        category = product.category + 's';
        break;
    }
    return {
      'Product Code,URL': product.designCode + ',' + 'http://upload.alsayyeddesign.com/' + category + '/' + product.designBrand + '/' + product.designCode + imgFormat
    }
  })
    return newArr
  }

  //Returns image import one data for exporting
  get exportedImageImportExtraData(): any {
    const products = this.state;
    const newArr = products.map((product: IResinFeature) => {
    let category = product.category;
    switch(product.category) {
      case 'Bangle':
        category = 'Bracelets';
        break;
      case 'Bangle Set':
        category = 'Bracelet';
        break;
      case 'Halfset':
        category = 'Halfsets';
        break;
      default:
        category = product.category;
        break;
    }
      return {
        'Product Code,URL': product.designCode + ',' + 'http://upload.alsayyeddesign.com/' + category + '/' + product.designBrand + '/' + product.designCode + '-2.jpg'
      }
    })
    return newArr
  }

  //Returns ipublished data for exporting
  get exportedPublishedData(): any {
    const products = this.state;
    const newArr = products.map((product: IResinFeature) => {
      return {
        'External ID': product.externalId,
        'Name': product.designCode,
        'is_published': 'TRUE'
      }
    })
    return newArr
  }

  //Returns ipublished data for exporting
  get exportedEcommerceCategoryData(): any {
    const products = this.state;
    const newArr = products.map((product: IResinFeature) => {
      return {
        'External ID': product.externalId,
        'Name (Dont Import)': product.designCode,
        'Website Product Category / External Id': product.productCategory
      }
    })
    return newArr
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
