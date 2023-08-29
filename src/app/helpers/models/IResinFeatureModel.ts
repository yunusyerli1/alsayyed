import { FormControl } from "@angular/forms";

export interface IFirstFormModel {
  category: FormControl<string | null>;
  designBrand: FormControl<string | null>;
  quantity: FormControl<string | null>;
  style: FormControl<string | null>;
  rawMaterial: FormControl<string | null>;
  fullsetAttribute: FormControl<string | null>;
}

export interface IResinFeature {
    designCategory: string;
    category: string;
    designBrand: string;
    designCode: string;
    attribute?: string;
    attributeValue?: string;
    style: string;
    rawMaterial: string;
    fullsetAttribute?: string;
    quantity?: string;
    componentType: number;
    productCategory?: string; //Ecommerce Website Procuct Category
    externalId?: string;
    postfix?: AutoCompleteModel[];
    weightResin?: number;
    weight22Kt?: number;
    weight21Kt?: number;
    weight18Kt?: number;
    weight14Kt?: number;
    pricePrintable?: number;
    priceResin?: number;
    priceGold?: number;
    [key: string]: any;
}

export interface AutoCompleteModel {
  value: any;
  display: string;
}

export interface ObjectMap  {
  [key: string]: any;
};


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
