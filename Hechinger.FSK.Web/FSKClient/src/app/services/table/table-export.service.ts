import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from 'xlsx';
import { TableColumnModel } from '../../models/table-column-model';
import { LanguageService } from '../language/language.service';
@Injectable({
  providedIn: 'root'
})
export class TableExportService {
  currentLang: string;
  constructor(private languageService: LanguageService, private translateService: TranslateService) {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      if(lang) this.currentLang = lang;
    });
  }

  export<T>(dataSource: MatTableDataSource<T>, columnNames: Array<TableColumnModel>, fileName?: string): void {
    let data = null;
    if (dataSource.sort) data = dataSource.sortData(dataSource.filteredData, dataSource.sort);
    else data = dataSource.filteredData;
    let array = new Array<any>();
   
    data.forEach(row => {
      const myObj: { [key: string]: any } = { }
      for (const [key, value] of Object.entries(row)) {
        
        let currentDisplay = columnNames.find(column => column.name == key)?.displayName;
  
        if (currentDisplay) {
          this.translateService.get(key).subscribe(translated => {
            myObj[translated] = value;
          })
        } 
      }
      array.push(myObj)
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(array);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
