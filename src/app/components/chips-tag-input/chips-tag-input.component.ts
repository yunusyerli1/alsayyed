import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
import { AutoCompleteModel } from 'src/app/helpers/models/IResinFeatureModel';



@Component({
  selector: 'app-chips-tag-input',
  templateUrl: './chips-tag-input.component.html',
  styleUrls: ['./chips-tag-input.component.scss']
})
export class ChipsTagInputComponent {

  @Output() valuesToBeSent = new EventEmitter<AutoCompleteModel[]>();

     //selectedValues: Option[] = [];


     public selectedValues: AutoCompleteModel[] = [];

    options: any[] = [];


   public onAdd(): void {
     const value = this.selectedValues.map(option => option.value);
     // this.field.valueList = value;
     // this.field.formControl.setValue(value);
     // this.field.formControl.markAsDirty();
     console.log("add", this.selectedValues)
     this.valuesToBeSent.emit(this.selectedValues);
 }

 public onRemove(): void {
     const value = this.selectedValues.map(option => option.value);
     // this.field.valueList = value;
     // this.field.formControl.setValue(value);
     // this.field.formControl.markAsDirty();
     console.log("add", this.selectedValues)
     this.valuesToBeSent.emit(this.selectedValues);

 }

}
