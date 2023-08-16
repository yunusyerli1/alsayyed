import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';
import { CategoryLogicActionHandler } from './categoryLogic.action';
import { IResinFeature } from '../helpers/models/IResinFeatureModel';

@Injectable({
  providedIn: 'root'
})
export class BraceletService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'bracelet';

  constructor(private productStore: ProductStore) {
    super();
  }

  run(data: IResinFeature, isSetComponent?: boolean) {
    const quantity = Number(data.quantity ? data.quantity : 0);
    const arr = [];

    for(let i = 0; i < quantity; i++) {
      const newObj = {
        category: data.category,
        designBrand: data.designBrand + this.setNumbers(i) + (isSetComponent ? '-BL' : ''),
        componentType: isSetComponent ? 'Set Component' : 'Single Component',
        style: data.style,
        rawMaterial: data.rawMaterial,
        dimensionDefault: data.dimensionDefault
      }
      arr.push(newObj);
    }
    this.productStore.setState(arr);
  }

}
