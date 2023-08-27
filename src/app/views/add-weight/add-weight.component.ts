import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesForUpload } from 'src/app/helpers/contants/FilesForUpload';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ProductStore } from 'src/app/stores/product.store';
import { WeightStore } from 'src/app/stores/weight.store';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss']
})
export class AddWeightComponent {

  isDisable: boolean = true;

  productWeights$!: Observable<any>;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private excelService: ExcelServiceService, private weightStore: WeightStore) {}

  ngOnInit(): void {
    this.productWeights$ = this.weightStore.weightState$;
  }

  uploadFile(event: any): void {
    this.isDisable = false;
    this.excelService.uploadFile(event, FilesForUpload.WEIGHT);
  }

  setWeight() {
    this.weightStore.setWeight();
    this.isDisable = true;

    if (this.fileInput) {
      this.fileInput.nativeElement.value = null;
    }
  }

  onDataChanged(event: any[]): void {
    this.weightStore.updateWeightState(event);
  }

}
