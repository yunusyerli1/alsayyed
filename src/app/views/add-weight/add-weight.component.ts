import { Component } from '@angular/core';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss']
})
export class AddWeightComponent {

  constructor(private excelService: ExcelServiceService) {}

  uploadFile(event: any) {
    this.excelService.uploadFile(event)
}

}
