import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteModel, IFirstFormModel } from 'src/app/helpers/models/IResinFeatureModel';
import { RawMaterial } from 'src/app/helpers/contants/RawMaterial';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { Categories } from 'src/app/helpers/contants/Categories';
import { CategoryManager } from 'src/app/services/category.manager';
import { ProductStore } from 'src/app/stores/product.store';
import { deepClone } from 'src/app/helpers/object-utils';

@Component({
  selector: 'app-list-first',
  templateUrl: './list-first.component.html',
  styleUrls: ['./list-first.component.scss']
})
export class ListFirstComponent implements OnInit {

  listFirstForm: FormGroup<IFirstFormModel>;
  rawMaterial = RawMaterial;
  categories: string[] = [];
  selectedTags: AutoCompleteModel[] = [];
  isTagInputHidden: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productStore: ProductStore,
    private excelService: ExcelServiceService,
    private categoryManager: CategoryManager
    ) {

    this.listFirstForm = this.formBuilder.group({
      category: ['', Validators.required],
      designBrand: ['', [Validators.required, Validators.maxLength(6)]],
      quantity: ['', [Validators.required, Validators.maxLength(3)]],
      style: ['', Validators.required],
      rawMaterial: ['', Validators.required],
      dimensionDefault: ['', Validators.maxLength(3)],
      fullsetAttribute: ['']
    });


  }

  ngOnInit(): void {
    this.setCategories();
    //this.productStore.vm$.subscribe(data => console.log(data));
  }

  changeSelection(e: any, formItem: string) {
    let formEl = this.listFirstForm.value;
    Object.keys(formEl).forEach(el => {
      if(el == formItem) {
        el = e.target.value
      }
    })
    this.isTagInputHidden = false;
    if(formEl.category === Categories.FULLSET || formEl.category === Categories.HALFSET || formEl.category === Categories.BANGLE_SET) {
      this.isTagInputHidden = true;
    }
  }

  setTags(e: AutoCompleteModel[]) {
      this.selectedTags = e;
      console.log("this.selectedTags", this.selectedTags)
  }

  setCategories() {
    Object.values(Categories).forEach((value) => {
      this.categories.push(value);
    })
  }

  editOperatorKey(operatorKey: string): string {
    const spaceIndex = operatorKey.indexOf(' ');
    if(spaceIndex > 0) {
      operatorKey = operatorKey.replace(/\s+/g, '-');
    }
    return operatorKey.toLowerCase();
  }

  onSubmit() {
    let data = deepClone(this.listFirstForm.value);
    data.postfix = this.selectedTags;
    let operatorKey = data.category ?? '';
    operatorKey = this.editOperatorKey(operatorKey);
    console.log("operatorKey", operatorKey)
    const operator = this.categoryManager.get(operatorKey.toLowerCase());
    if (!operator) {
      console.warn(`Operator: '${operatorKey}' not found.`);
    }
    console.log("data", data)
    operator?.run(data);
    this.listFirstForm.reset();
  }

  deleteBrand() {
    const designBrand = this.listFirstForm.value.designBrand;
    this.productStore.deleteFromState(designBrand);
  }

  exportToExcel() {
   this.excelService.exportJSONToExcel(this.productStore.state, "object.xlsx")
  }

  exportTableToExcel(): void {
    /* pass here the table id */
    let tableId = document.getElementById('excel-table');
    this.excelService.exportTableToExcel(tableId, "tablodan.csv")
  }


}
