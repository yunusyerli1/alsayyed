import { Injectable } from '@angular/core';
import { IResinFeature } from '../helpers/models/IResinFeatureModel';

@Injectable({
  providedIn: 'root'
})
export class ProductCreationService {

  constructor() { }

  public prepareData(data: any) {
    console.log(data);
    const quantity = Number(data.quantity ? data.quantity : 0);
    const arr = [];

    for(let i = 0; i < quantity; i++) {
      const newObj = {
        category: data.category,
        designBrand: data.designBrand + this.getNumbers(i),
        componentType: data.componentType,
        style: data.style,
        rawMaterial: data.rawMaterial,
        dimensionDefault: data.dimensionDefault,
        fullsetAttribute: data.fullsetAttribute
      }
      arr.push(newObj);
    }
    console.log("arr", arr)
    return arr;
  }

  getNumbers(number: any) : string{
    if(number < 10) {
      return '0'+(number + 1);
    }
    return number + 1;
  }

}
