import { Component } from '@angular/core';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-list-download',
  templateUrl: './list-download.component.html',
  styleUrls: ['./list-download.component.scss']
})
export class ListDownloadComponent {

  constructor(
    private productStore: ProductStore,
    private excelService: ExcelServiceService
    ) {}

  downloadKarat() {
    this.excelService.exportJSONToExcel(this.productStore.exportedKaratData, "Variant-Karat.xlsx")
  }

  downloadOrderType() {
    this.excelService.exportJSONToExcel(this.productStore.exportedOrderTypeData, "Variant-OrderType.xlsx")
  }

  downloadImageImport() {
    this.excelService.exportJSONToExcel(this.productStore.exportedImageImportData, "imageImport.xlsx")
  }

  downloadImageImportExtra() {
    this.excelService.exportJSONToExcel(this.productStore.exportedImageImportExtraData, "imageExtraImport.xlsx")
  }

  downloadIsPublished() {
    this.excelService.exportJSONToExcel(this.productStore.exportedPublishedData, "isPublished.xlsx")
  }

  downloadWebCategories() {
    this.excelService.exportJSONToExcel(this.productStore.exportedEcommerceCategoryData, "EcommerceCategories.xlsx")
  }


}
