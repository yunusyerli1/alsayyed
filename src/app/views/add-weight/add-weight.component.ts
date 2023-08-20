import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss']
})
export class AddWeightComponent {

  productWeights$!: Observable<any>;

  constructor(private excelService: ExcelServiceService, private productStore: ProductStore) {}

  ngOnInit(): void {
    this.productWeights$ = this.productStore.weightState$;
  }

  uploadFile(event: any) {
    this.excelService.uploadFile(event)
  }

  setWeight() {
    this.productStore.setWeight();
  }

}
