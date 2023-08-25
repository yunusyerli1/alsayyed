import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesForUpload } from 'src/app/helpers/contants/FilesForUpload';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ProductStore } from 'src/app/stores/product.store';
import { WeightStore } from 'src/app/stores/weight.store';

@Component({
  selector: 'app-add-relations',
  templateUrl: './add-relations.component.html',
  styleUrls: ['./add-relations.component.scss']
})
export class AddRelationsComponent {




  constructor(private productStore: ProductStore) {}

  ngOnInit(): void {

  }

  setRelations() {
    this.productStore.setRelationships();



  }
}
