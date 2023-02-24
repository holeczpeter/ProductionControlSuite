import { Component, OnInit } from '@angular/core';
import { FileSnippet } from '../../../models/file-snippet';
import { ImportDataService } from '../../../services/data/import-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  title = 'basicdata';
  constructor(private readonly importService: ImportDataService,
    private readonly snakBarService: SnackbarService) { }

  ngOnInit(): void {
  }
  onUploadOperations(event: FileSnippet) {
    let formDataToSend = new FormData();
    formDataToSend.set('file', event.file);
    this.importService.importOperation(formDataToSend).subscribe(result => {
      this.snakBarService.open(result);
    });
  }
  onUpdateOperations(event: FileSnippet) {
    let formDataToSend = new FormData();
    formDataToSend.set('file', event.file);
    this.importService.updateImportedOperation(formDataToSend).subscribe(result => {
      this.snakBarService.open(result);
    });
  }
  onUploadDefects(event: FileSnippet) {
    let formDataToSend = new FormData();
    formDataToSend.set('file', event.file);
    this.importService.importDefect(formDataToSend).subscribe(result => {
      this.snakBarService.open(result);
    });
  }
  onUploadSummaryCards(event: FileSnippet) {
    let formDataToSend = new FormData();
    formDataToSend.set('file', event.file);
    this.importService.importSummaryCard(formDataToSend).subscribe(result => {
      this.snakBarService.open(result);
    });
  }
}
