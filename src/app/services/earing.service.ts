import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';
import { CategoryLogicActionHandler } from './categoryLogic.action';
import { AutoCompleteModel, IResinFeature } from '../helpers/models/IResinFeatureModel';
import { ProductDesignCategories } from '../helpers/contants/ProductDesignCategories';
import { ComponentType } from '../helpers/contants/ComponentType';

@Injectable({
  providedIn: 'root'
})
export class EaringService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'earing';

  constructor(private productStore: ProductStore) {
    super();
  }

  run(data: IResinFeature, isSetComponent?: boolean) {
    console.log("data", data)
    const quantity = Number(data.quantity || 0);
    const postfix = data.postfix || [];
    const productArr: IResinFeature[] = [];
    for (let i = 0; i < quantity; i++) {
      const designCode = data.designBrand + this.setNumbers(i) + (isSetComponent ? '-E' : '');
      const designCategory = isSetComponent ? ProductDesignCategories.EARING_AS_SET : ProductDesignCategories.EARING_AS_SINGLE;
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
