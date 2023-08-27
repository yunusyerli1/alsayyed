import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesForUpload } from 'src/app/helpers/contants/FilesForUpload';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ProductStore } from 'src/app/stores/product.store';
import { RelationStore } from 'src/app/stores/relation.store';
import { WeightStore } from 'src/app/stores/weight.store';

@Component({
  selector: 'app-add-relations',
  templateUrl: './add-relations.component.html',
  styleUrls: ['./add-relations.component.scss']
})
export class AddRelationsComponent {

  relationships$!: Observable<any>;

  constructor(private relationStore: RelationStore, private excelService: ExcelServiceService) {}

  ngOnInit(): void {
    this.relationships$ = this.relationStore.relationState$;
  }

  setRelations() {
    this.relationStore.setRelationships();
  }
  exportRelations() {
    const relations = this.relationStore.exportedData;
    this.excelService.exportJSONToExcel(relations, "object.xlsx")
  }
}
