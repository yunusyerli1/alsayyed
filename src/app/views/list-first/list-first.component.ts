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

  userList = [

    {

    "id": 1,

    "name": "Leanne Graham",

    "username": "Bret",

    "email": "Sincere@april.biz"

    },

    {

    "id": 2,

    "name": "Ervin Howell",

    "username": "Antonette",

    "email": "Shanna@melissa.tv"

    },

    {

    "id": 3,

    "name": "Clementine Bauch",

    "username": "Samantha",

    "email": "Nathan@yesenia.net"

    },

    {

    "id": 4,

    "name": "Patricia Lebsack",

    "username": "Karianne",

    "email": "Julianne.OConner@kory.org"

    },

    {

    "id": 5,

    "name": "Chelsey Dietrich",

    "username": "Kamren",

    "email": "Lucio_Hettinger@annie.ca"

    }

    ]


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
      componentType: ['', Validators.required],
      style: ['', Validators.required],
      rawMaterial: ['', Validators.required],
      dimensionDefault: ['', Validators.maxLength(3)],
      fullsetAttribute: [''],
    });


  }

  ngOnInit(): void {
    this.setCategories();
    this.products$ = this.productStore.getProducts();
    this.products$.subscribe(data => console.log("data", data))
    console.log("products", this.products$)
  }

  setCategories() {
    Object.values(Categories).forEach((value) => {
      this.categories.push(value);
    })
  }


  changeCategory(e: any) {
    this.listFirstForm.value.category = e.target.value;
  }

  changeComponentType(e: any) {
    this.listFirstForm.value.componentType = e.target.value;
  }

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
    //this.ringService.prepareData(data);
    this.productStore.products$.subscribe(data => console.log("data",data))
  }

  exportTableToExcel(): void {
    /* pass here the table id */
    let tableId = document.getElementById('excel-table');
    this.excelService.exportTableToExcel(tableId, "tablodan.csv")
  }

  exportToExcel() {
    this.excelService.exportJSONToExcel(this.userList, "object.xlsx")
  }

}
