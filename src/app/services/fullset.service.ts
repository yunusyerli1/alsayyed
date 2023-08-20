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
import { ProductDesignCategories } from '../helpers/contants/ProductDesignCategories';

@Injectable({
  providedIn: 'root'
})
export class FullsetService extends CategoryLogicActionHandler implements ICategoryManagerModel {

  key = 'fullset';

  constructor(
    private productStore: ProductStore,
    private earingService: EaringService,
    private ringService: RingService,
    private bangleService: BangleService,
    private braceletService: BraceletService,
    private necklaceService: NecklaceService
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
        designCategory: ProductDesignCategories.FULLSET,
        style: data.style,
        rawMaterial: data.rawMaterial,
        fullsetAttribute: data.fullsetAttribute
      }
      arr.push(newObj);
    }

    this.populateData(data);
    this.productStore.addToState(arr);
  }

  populateData(data: IResinFeature) {
    this.necklaceService.run(data, true);
    this.bangleService.run(data, true);
    this.braceletService.run(data, true);
    this.earingService.run(data, true);
    this.ringService.run(data, true);
  }

}
