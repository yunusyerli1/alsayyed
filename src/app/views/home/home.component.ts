import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteModel, IFirstFormModel } from 'src/app/helpers/models/IResinFeatureModel';
import { RawMaterial } from 'src/app/helpers/contants/RawMaterial';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { Categories } from 'src/app/helpers/contants/Categories';
import { CategoryManager } from 'src/app/services/category.manager';
import { ProductStore } from 'src/app/stores/product.store';
import { deepClone } from 'src/app/helpers/object-utils';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  listFirstForm: FormGroup<IFirstFormModel>;
  rawMaterial = RawMaterial;
  categories: string[] = [];
  selectedTags: AutoCompleteModel[] = [];
  isTagInputHidden: boolean = false;
  isEdit: boolean = false;

  products$!: Observable<any>;

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
      fullsetAttribute: ['']
    });


  }

  ngOnInit(): void {
    this.listFirstForm.get('rawMaterial')?.setValue(RawMaterial.YELLOW_RESIN);
    this.listFirstForm.get('style')?.setValue("No Stone");
    this.setCategories();
    this.products$ = this.productStore.state$;
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
    operator?.run(data);
    this.listFirstForm.reset();
    this.selectedTags = [];
  }

  deleteBrand() {
    const designBrand = this.listFirstForm.value.designBrand;
    this.productStore.deleteCollection(designBrand);
  }

  exportToExcel() {
   this.excelService.exportJSONToExcel(this.productStore.exportedData, "2.Product Info Import (Basic Import For Website).xlsx")
  }

  exportTableToExcel(): void {
    /* pass here the table id */
    let tableId = document.getElementById('excel-table');
    this.excelService.exportTableToExcel(tableId, "tablodan.xlsx")
  }

  onDataChanged(event: any[]): void {
    this.productStore.updateState(event);
  }

  onDataDeleted(designCode: string): void {
    this.productStore.deleteItem(designCode);
  }

  editTable() {
    this.isEdit = !this.isEdit;
  }

}
