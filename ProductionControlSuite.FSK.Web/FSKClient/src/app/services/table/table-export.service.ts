import { DatePipe } from '@angular/common';
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
  constructor(private languageService: LanguageService,
    private datePipe: DatePipe,
    private translateService: TranslateService) {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      if(lang) this.currentLang = lang;
    });
  }

  exportFromDataSource<T>(dataSource: MatTableDataSource<T>, columnNames: Array<TableColumnModel>, fileName?: string): void {
    let data = null;
  
    if (dataSource.sort) data = dataSource.sortData(dataSource.filteredData, dataSource.sort);
    else data = dataSource.filteredData;
  
    let array = new Array<any>();
   
    data.forEach(row => {
      const myObj: { [key: string]: any } = { }
      for (const [key, value] of Object.entries(row)) {
        let currentValue: string | null = value;
        if (key == 'date') {
          let currentDate = new Date(value);
          currentValue  = this.datePipe.transform(currentDate, 'yyyy.MM.dd');
        }
        if (key == 'created') {
          let currentDate = new Date(value);
          currentValue = this.datePipe.transform(currentDate, 'yyyy.MM.dd : HH:mm');
        }
        
        let currentDisplay = columnNames.find(column => column.name == key)?.displayName;
  
        if (currentDisplay) {
          this.translateService.get(key).subscribe(translated => {
            myObj[translated] = currentValue;
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
  exportFromInnerHTML(tbls: HTMLCollectionOf<HTMLTableElement>, name: string) {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function (s: any) {
        return window.btoa(unescape(encodeURIComponent(s)))
      },
      format = function (s: any, c: any) {
        return s.replace(/{(\w+)}/g, function (m: any, p: any) {
          return c[p];
        })
      }

    var element = "";
    
    for (var i = 0; i < tbls.length; i++) {
      element += tbls[i].innerHTML;
    }
    var ctx = {
      worksheet: name || '',
      table: element
    };
    var link = document.createElement("a");
    link.download = name;
    link.href = uri + base64(format(template, ctx));
    link.click();

  }
  exportTableFromInnerHTML(tbl: HTMLElement, name: string) {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function (s: any) {
        return window.btoa(unescape(encodeURIComponent(s)))
      },
      format = function (s: any, c: any) {
        return s.replace(/{(\w+)}/g, function (m: any, p: any) {
          return c[p];
        })
      }
    var ctx = {
      worksheet: name || '',
      table: tbl.innerHTML
    };
    var link = document.createElement("a");
    link.download = name;
    link.href = uri + base64(format(template, ctx));
    link.click();

  }
}
