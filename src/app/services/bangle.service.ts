import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';
import { CategoryLogicActionHandler } from './categoryLogic.action';
import { IResinFeature } from '../helpers/models/IResinFeatureModel';

@Injectable({
  providedIn: 'root'
})
export class BangleService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'bangle';

  constructor(private productStore: ProductStore) {
    super();
  }

  run(data: IResinFeature, isSetComponent?: boolean) {
    const quantity = Number(data.quantity || 0);
    const postfix = data.postfix || [];
    const productArr: IResinFeature[] = [];
    for (let i = 0; i < quantity; i++) {
      const designCode = data.designBrand + this.setNumbers(i) + (isSetComponent ? '-BK' : '');
      const componentType = isSetComponent ? 'Set Component' : 'Single Component';
      const newProduct: IResinFeature = { ...data, designCode, componentType };
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

    this.productStore.addToState(arrToStore);
  }

}
