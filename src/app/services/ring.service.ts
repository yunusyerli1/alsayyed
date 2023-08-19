import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';
import { CategoryLogicActionHandler } from './categoryLogic.action';
import { IResinFeature } from '../helpers/models/IResinFeatureModel';
import { ProductDesignCategories } from '../helpers/contants/ProductDesignCategories';

@Injectable({
  providedIn: 'root'
})
export class RingService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'ring';

  constructor(private productStore: ProductStore) {
    super();
  }

  run(data: IResinFeature, isSetComponent?: boolean) {
    const quantity = Number(data.quantity || 0);
    const postfix = data.postfix || [];
    const productArr: IResinFeature[] = [];
    for (let i = 0; i < quantity; i++) {
      const designCode = data.designBrand + this.setNumbers(i) + (isSetComponent ? '-R' : '');
      const designCategory = isSetComponent ? ProductDesignCategories.RING_AS_SET : ProductDesignCategories.RING_AS_SINGLE;
      const attribute = 'Ring Size';
      const attributeValue = '54,56,58,60,62';
      const newProduct: IResinFeature = { ...data, designCode, designCategory, attribute, attributeValue };
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
