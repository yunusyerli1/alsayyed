import { FormControl } from "@angular/forms";

export interface IFirstFormModel {
  category: FormControl<string | null>;
  designBrand: FormControl<string | null>;
  quantity: FormControl<string | null>;
  //componentType: FormControl<string | null>;
  style: FormControl<string | null>;
  rawMaterial: FormControl<string | null>;
  dimensionDefault: FormControl<string | null>;
  fullsetAttribute: FormControl<string | null>;
  postfix: FormControl<string | null>;
}

export interface IResinFeature {
    category: string;
    designBrand: string;
    componentType: string;
    style: string;
    rawMaterial: string;
    dimensionDefault?: number;
    fullsetAttribute?: string;
    quantity?: string;
}


export interface IResinFeature2{
  category: string;
  designBrand: string;
  designCode: string;
  dimensionOne: number;
  dimensionTwo: number;
  dimensionThree: number;
  dimensionFour: number;
  dimensionDefault: number;
  relatedOne: string;
  relatedTwo: string;
  relatedThree: string;
  relatedFour: string;
  componentType: string;
  fullsetAttribute: string;
  ringSizeOne: number;
  ringSizeTwo: number;
  ringSizeThree: number;
  ringSizeFour: number;
  ringSizeFive: number;
  style: string;
  rawMaterial: string;
  weightResin: number;
  weight22: number;
  weight21: number;
  weight18: number;
  weight14: number;
  pricePrintable: number;
  priceResinGram: number;
  priceGoldGram: number;
}
