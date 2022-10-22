import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExcelExport } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class FileDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getTableExport(spreadSheetContent: ExcelExport) {
    return this.httpClient.post('File/GetExcelExport', spreadSheetContent, { responseType: 'blob' })
  }
}
