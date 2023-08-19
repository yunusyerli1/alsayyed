import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';
import { CategoryLogicActionHandler } from './categoryLogic.action';
import { IResinFeature } from '../helpers/models/IResinFeatureModel';
import { ProductDesignCategories } from '../helpers/contants/ProductDesignCategories';

@Injectable({
  providedIn: 'root'
})
export class BraceletService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'bracelet';

  constructor(private productStore: ProductStore) {
    super();
  }

  run(data: IResinFeature, isSetComponent?: boolean) {
    const quantity = Number(data.quantity || 0);
    const postfix = data.postfix || [];
    const productArr: IResinFeature[] = [];
    for (let i = 0; i < quantity; i++) {
      const designCode = data.designBrand + this.setNumbers(i) + (isSetComponent ? '-BL' : '');
      const designCategory = isSetComponent ? ProductDesignCategories.BRACELET_AS_SET : ProductDesignCategories.BRACELET_AS_SINGLE;
      const newProduct: IResinFeature = { ...data, designCode, designCategory };
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
