import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../../helpers/models/ICategoryManager';
import { ProductStore } from '../../stores/product.store';
import { CategoryLogicActionHandler } from '../categoryLogic.action';
import { IResinFeature } from '../../helpers/models/IResinFeatureModel';
import { ProductDesignCategories } from '../../helpers/contants/ProductDesignCategories';
import { ComponentType } from '../../helpers/contants/ComponentType';
import { WebsiteProductCategories } from '../../helpers/contants/WebsiteProductCategories';

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
      const designCode = data.designBrand + this.setNumbers(i);
      const designCategory = ProductDesignCategories.CHAIN_AS_SINGLE;
      const componentType =  ComponentType.SINGLE_COMPONENT;
      const productCategory = WebsiteProductCategories.CHAIN;
      const newProduct: IResinFeature = { ...data, designCode, designCategory, componentType, productCategory };
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