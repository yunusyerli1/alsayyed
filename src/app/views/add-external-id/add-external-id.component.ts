import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesForUpload } from 'src/app/helpers/contants/FilesForUpload';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ExternalIdStore } from 'src/app/stores/externalid.store';

@Component({
  selector: 'app-add-external-id',
  templateUrl: './add-external-id.component.html',
  styleUrls: ['./add-external-id.component.scss']
})
export class AddExternalIdComponent {

  isDisable: boolean = true;

  externalIds$!: Observable<any>;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private excelService: ExcelServiceService, private externalIdStore: ExternalIdStore) {}

  ngOnInit(): void {
    this.externalIds$ = this.externalIdStore.externalIdState$;
  }

  uploadFile(event: any): void {
    this.isDisable = false;
    this.excelService.uploadFile(event, FilesForUpload.EXTERNAL_IDS)
  }

  setExternalIds() {
    this.externalIdStore.setExternalIds();
    this.isDisable = true;

    if (this.fileInput) {
      this.fileInput.nativeElement.value = null;
    }
  }

}
