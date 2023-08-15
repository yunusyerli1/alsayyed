import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFirstFormModel } from 'src/app/helpers/models/IResinFeatureModel';
import { RawMaterial } from 'src/app/helpers/contants/RawMaterial';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { RingService } from 'src/app/services/ring.service';
import { Categories } from 'src/app/helpers/contants/Categories';
import { CategoryManager } from 'src/app/services/category.manager';
import { ProductStore } from 'src/app/stores/product.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-first',
  templateUrl: './list-first.component.html',
  styleUrls: ['./list-first.component.scss']
})
export class ListFirstComponent implements OnInit {

  listFirstForm: FormGroup<IFirstFormModel>;
  rawMaterial = RawMaterial;
  categories:any = [];

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
      //componentType: ['', Validators.required],
      style: ['', Validators.required],
      rawMaterial: ['', Validators.required],
      dimensionDefault: ['', Validators.maxLength(3)],
      fullsetAttribute: [''],
    });


  }

  ngOnInit(): void {
    this.productStore.init();
    this.setCategories();
    this.products$ = this.productStore.state$;
  }

  setCategories() {
    Object.values(Categories).forEach((value) => {
      this.categories.push(value);
    })
  }


  changeCategory(e: any) {
    this.listFirstForm.value.category = e.target.value;
  }

  // changeComponentType(e: any) {
  //   this.listFirstForm.value.componentType = e.target.value;
  // }

  changeRawMaterial(e: any) {
    this.listFirstForm.value.rawMaterial = e.target.value;
  }

  changeStyle(e: any) {
    this.listFirstForm.value.style = e.target.value;
  }

  editOperatorKey(operatorKey: string): string {
    const spaceIndex = operatorKey.indexOf(' ');
    if(spaceIndex > 0) {
      operatorKey = operatorKey.replace(/\s+/g, '-');
    }
    return operatorKey.toLowerCase();
  }

  onSubmit() {
    const data = this.listFirstForm.value;
    let operatorKey = data.category ?? '';
    operatorKey = this.editOperatorKey(operatorKey);
    console.log("operatorKey", operatorKey)
    const operator = this.categoryManager.get(operatorKey.toLowerCase());
    if (!operator) {
      console.warn(`Operator: '${operatorKey}' not found.`);
    }
    operator?.run(data);
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
