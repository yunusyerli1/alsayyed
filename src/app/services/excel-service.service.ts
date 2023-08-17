import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  //file!: File;
  // arrayBuffer: any;
  // fileList: any

  data: AOA = [[], []];

  private weightStore = new BehaviorSubject<any>([]);
  public weightState$ = this.weightStore.asObservable();

  constructor() { }

  private updateState(data: any): void {
    this.weightStore.next(data);
  }

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

  uploadFile(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const file: File = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e:any) => {
        /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      this.sendWeightData(this.data);
    }
  }

  sendWeightData(data: any) {
    console.log(data);
     //const newData = data.filter((arr: string[]) => arr[0] !== null);
     this.data = data.filter((subArray: any[]) => {
      // Filter out sub-arrays that are empty or contain only null values
      return  subArray.length > 0 && !subArray.every(item => item === null || item === 0);
  });
    this.updateState(this.data)
     console.log(this.data);
  }


}
