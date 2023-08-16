import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteModel, IFirstFormModel } from 'src/app/helpers/models/IResinFeatureModel';
import { RawMaterial } from 'src/app/helpers/contants/RawMaterial';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { RingService } from 'src/app/services/ring.service';
import { Categories } from 'src/app/helpers/contants/Categories';
import { CategoryManager } from 'src/app/services/category.manager';
import { ProductStore } from 'src/app/stores/product.store';
import { Observable } from 'rxjs';
import { TagInputComponent } from 'ngx-chips';
import { TagModel } from 'ngx-chips/core/tag-model';
import { deepClone } from 'src/app/helpers/object-utils';

@Component({
  selector: 'app-list-first',
  templateUrl: './list-first.component.html',
  styleUrls: ['./list-first.component.scss']
})
export class ListFirstComponent implements OnInit {

  listFirstForm: FormGroup<IFirstFormModel>;
  rawMaterial = RawMaterial;
  categories:any = [];

  selectedTags: AutoCompleteModel[] = [];

  public products$!: Observable<any>;


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
    this.productStore.init();
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
    let formEl = deepClone(this.listFirstForm.value);
    formEl.postfix = this.selectedTags;
    let operatorKey = formEl.category ?? '';
    operatorKey = this.editOperatorKey(operatorKey);
    console.log("operatorKey", operatorKey)
    const operator = this.categoryManager.get(operatorKey.toLowerCase());
    if (!operator) {
      console.warn(`Operator: '${operatorKey}' not found.`);
    }
    operator?.run(formEl);
    this.listFirstForm.reset();
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
