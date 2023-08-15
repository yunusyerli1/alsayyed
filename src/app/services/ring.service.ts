import { Injectable } from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { ProductStore } from '../stores/product.store';

@Injectable({
  providedIn: 'root'
})
export class RingService implements ICategoryManagerModel {

  key = 'ring';

  constructor(private productStore: ProductStore) { }

  run(data:any) {
    console.log(data);
    const quantity = Number(data.quantity ? data.quantity : 0);
    const arr = [];

    for(let i = 0; i < quantity; i++) {
      const newObj = {
        category: data.category,
        designBrand: data.designBrand + this.setNumbers(i),
        componentType: 'Single Component',
        style: data.style,
        rawMaterial: data.rawMaterial,
        dimensionDefault: data.dimensionDefault,
        fullsetAttribute: data.fullsetAttribute
      }
      arr.push(newObj);
    }
    this.productStore.setState(arr);
  }

  setNumbers(number: number) : string{
    if(number < 9) {
      return '0' + (number + 1);
    }
    return (number + 1).toString();
  }

}
