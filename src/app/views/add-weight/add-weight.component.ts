import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss']
})
export class AddWeightComponent {

  isDisable: boolean = true;

  productWeights$!: Observable<any>;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private excelService: ExcelServiceService, private productStore: ProductStore) {}

  ngOnInit(): void {
    this.productWeights$ = this.productStore.weightState$;
  }

  uploadFile(event: any): void {
    this.isDisable = false;
    this.excelService.uploadFile(event)
  }

  setWeight() {
    this.productStore.setWeight();
    this.clean();
    this.isDisable = true;

    if (this.fileInput) {
      this.fileInput.nativeElement.value = null;
    }
  }

  clean() {

  }

}
