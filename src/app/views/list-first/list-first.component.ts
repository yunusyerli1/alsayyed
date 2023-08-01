import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IResinFeature } from 'src/app/models/IResinFeatureModel';

@Component({
  selector: 'app-list-first',
  templateUrl: './list-first.component.html',
  styleUrls: ['./list-first.component.scss']
})
export class ListFirstComponent {

  listFirstForm: FormGroup<IResinFeature>;


  constructor(private formBuilder: FormBuilder) {
    this.listFirstForm = this.formBuilder.group({
      category: ['', Validators.required],
      designBrand: ['', [Validators.required, Validators.maxLength(6)]],
      quantity: [null as unknown as number, [Validators.required, Validators.maxLength(3)]],
      dimensionDefault: [null as unknown as number],
      componentType: ['', Validators.required],
      fullsetAttribute: [''],
      style: ['', Validators.required],
      rawMaterial: ['', Validators.required],
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
     console.warn(this.listFirstForm.value);
   }




}
