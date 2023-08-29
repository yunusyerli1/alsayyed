import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../../helpers/models/ICategoryManager';
import { ProductStore } from '../../stores/product.store';
import { CategoryLogicActionHandler } from '../categoryLogic.action';
import { IResinFeature } from '../../helpers/models/IResinFeatureModel';
import { BangleService } from './bangle.service';
import { RingService } from './ring.service';
import { ProductDesignCategories } from '../../helpers/contants/ProductDesignCategories';
import { ComponentType } from '../../helpers/contants/ComponentType';
import { WebsiteProductCategories } from '../../helpers/contants/WebsiteProductCategories';

@Injectable({
  providedIn: 'root'
})
export class BanglesetService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'bangle-set';

  constructor(
    private productStore: ProductStore,
    private ringService: RingService,
    private bangleService: BangleService,
    ) {
    super();
  }

  run(data: IResinFeature) {
    const quantity = Number(data.quantity ? data.quantity : 0);
    const arr = [];

    for(let i = 0; i < quantity; i++) {
      const newObj = {
        category: data.category,
        designBrand: data.designBrand,
        designCode: data.designBrand + this.setNumbers(i),
        designCategory: ProductDesignCategories.BANGLE_SET,
        productCategory: WebsiteProductCategories.BANGLE_SET,
        style: data.style,
        rawMaterial: data.rawMaterial,
        fullsetAttribute: data.fullsetAttribute,
        componentType: ComponentType.SET
      }
      arr.push(newObj);
    }

    this.populateData(data);
    this.productStore.addToState(arr);
  }

  populateData(data: IResinFeature) {
    this.ringService.run(data, true);
    this.bangleService.run(data, true);
  }

}
