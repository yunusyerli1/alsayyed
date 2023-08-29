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
  selectedValues: AutoCompleteModel[] = [];
  options: any[] = [];


  public onAdd(): void {
    this.valuesToBeSent.emit(this.selectedValues);
 }

 public onRemove(): void {
    this.valuesToBeSent.emit(this.selectedValues);
 }

}
