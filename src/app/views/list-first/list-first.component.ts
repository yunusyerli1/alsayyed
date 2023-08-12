import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IResinFeature } from 'src/app/helpers/models/IResinFeatureModel';
import { RawMaterial } from 'src/app/helpers/contants/RawMaterial';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ProductCreationService } from 'src/app/services/product-creation.service';

@Component({
  selector: 'app-list-first',
  templateUrl: './list-first.component.html',
  styleUrls: ['./list-first.component.scss']
})
export class ListFirstComponent {

  listFirstForm: FormGroup<IResinFeature>;
  rawMaterial = RawMaterial;

  fileName= 'ExcelSheet.xlsx';
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
    private productCreationService: ProductCreationService,
    private excelService: ExcelServiceService
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

   changeComponentType(e: any) {
     this.listFirstForm.value.componentType = e.target.value;
   }

   changeRawMaterial(e: any) {
     this.listFirstForm.value.rawMaterial = e.target.value;
   }

   changeStyle(e: any) {
     this.listFirstForm.value.style = e.target.value;
   }

   onSubmit() {
     const data = this.listFirstForm.value;
     this.productCreationService.prepareData(data);
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
