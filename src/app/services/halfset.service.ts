import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';
import { CategoryLogicActionHandler } from './categoryLogic.action';
import { IResinFeature } from '../helpers/models/IResinFeatureModel';
import { EaringService } from './earing.service';
import { BangleService } from './bangle.service';
import { RingService } from './ring.service';
import { NecklaceService } from './necklace.service';
import { BraceletService } from './bracelet.service';
import { PendantService } from './pendant.service';
import { ProductDesignCategories } from '../helpers/contants/ProductDesignCategories';

@Injectable({
  providedIn: 'root'
})
export class HalfsetService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'halfset';

  constructor(
    private productStore: ProductStore,
    private earingService: EaringService,
    private ringService: RingService,
    private pendantService: PendantService
    ) {
    super();
  }

  run(data: IResinFeature) {
    const quantity = Number(data.quantity ? data.quantity : 0);
    const arr = [];

    console.log(data)

    for(let i = 0; i < quantity; i++) {
      const newObj = {
        category: data.category,
        designBrand: data.designBrand,
        designCode: data.designBrand + this.setNumbers(i),
        designCategory: ProductDesignCategories.HALFSET,
        style: data.style,
        rawMaterial: data.rawMaterial,
        dimensionDefault: data.dimensionDefault,
        fullsetAttribute: data.fullsetAttribute
      }
      arr.push(newObj);
    }

    this.populateData(data);
    this.productStore.addToState(arr);
  }

  populateData(data: IResinFeature) {
    this.pendantService.run(data, true);
    this.earingService.run(data, true);
    this.ringService.run(data, true);
  }

}
