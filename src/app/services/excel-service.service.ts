import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { ObjectMap } from '../helpers/models/IResinFeatureModel';
import { FilesForUpload } from '../helpers/contants/FilesForUpload';
import { WeightStore } from '../stores/weight.store';
import { ExternalIdStore } from '../stores/externalid.store';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor(private weightStore: WeightStore, private externalIdStore: ExternalIdStore) { }

  exportJSONToExcel(json_list: any[], fileName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json_list);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, fileName);
   }

   exportTableToExcel(table_id:any, fileName: string): void {
    /* pass here the table id */
    //let table_id = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(table_id);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  uploadFile(event: any, filetype:number) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const file: File = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e:any) => {
        /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const importedData: ObjectMap[] = XLSX.utils.sheet_to_json(ws);

      switch(filetype) {
        case FilesForUpload.WEIGHT:
          this.weightStore.importWeightData(importedData);
          break;
        case FilesForUpload.EXTERNAL_IDS:
          this.externalIdStore.importExternalIds(importedData);
          break;
      }


    }
  }


}
