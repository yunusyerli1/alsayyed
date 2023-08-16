import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';
import { CategoryLogicActionHandler } from './categoryLogic.action';
import { IResinFeature } from '../helpers/models/IResinFeatureModel';

@Injectable({
  providedIn: 'root'
})
export class ChainService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'chain';

  constructor(private productStore: ProductStore) {
    super();
  }

  run(data: IResinFeature) {
    const quantity = Number(data.quantity || 0);
    const postfix = data.postfix || [];
    const productArr: IResinFeature[] = [];
    for (let i = 0; i < quantity; i++) {
      const designBrand = data.designBrand + this.setNumbers(i);
      const newProduct: IResinFeature = { ...data, designBrand };
      productArr.push(newProduct);
    }
    const arrToStore = postfix.length
    ? productArr.flatMap(el =>
        postfix.map(postfixEl => ({
          ...el,
          designBrand: el.designBrand + '-' + postfixEl.value,
        }))
      )
    : productArr;

    this.productStore.setState(arrToStore);
  }

}
