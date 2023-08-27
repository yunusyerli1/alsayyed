import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent {
  @Input() tableData!: any[]
  @Output() dataChanged = new EventEmitter<any[]>();


  tracker= (i: any) => i;

  get rowKeys(): string[]{
    if(!this.tableData || !this.tableData.length){
      return [];
    }
    return Object.keys(this.tableData[0]);
  }

  onInputChanged(e: any, rowIndex: number, cellIndex: number, propertyKey: string): void {

    const newValue = this.tableData.map((row, index) => {
      return index !== rowIndex? row: {...row, [propertyKey]: e.target.value}
    })
    this.dataChanged.emit(newValue);
  }

}
