import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';
import { CategoryLogicActionHandler } from './categoryLogic.action';
import { IResinFeature } from '../helpers/models/IResinFeatureModel';
import { ProductDesignCategories } from '../helpers/contants/ProductDesignCategories';
import { ComponentType } from '../helpers/contants/ComponentType';

@Injectable({
  providedIn: 'root'
})
export class PendantService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'pendant';

  constructor(private productStore: ProductStore) {
    super();
  }

  run(data: IResinFeature, isSetComponent?: boolean) {
    const quantity = Number(data.quantity || 0);
    const postfix = data.postfix || [];
    const productArr: IResinFeature[] = [];
    for (let i = 0; i < quantity; i++) {
      const designCode = data.designBrand + this.setNumbers(i) + (isSetComponent ? '-P' : '');
      const designCategory = isSetComponent ? ProductDesignCategories.PENDANT_AS_SET : ProductDesignCategories.PENDANT_AS_SINGLE;
      const componentType =  isSetComponent ? ComponentType.SET_COMPONENT : ComponentType.SINGLE_COMPONENT;
      const newProduct: IResinFeature = { ...data, designCode, designCategory, componentType };
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
