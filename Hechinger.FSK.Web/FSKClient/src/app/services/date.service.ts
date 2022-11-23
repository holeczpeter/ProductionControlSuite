import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { MonthExtension } from '../models/generated/generated';
import { LanguageService } from './language/language.service';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  monthExtensions = new BehaviorSubject<Array<MonthExtension>>(this.setMonthsExtension(this.translateService.currentLang));
  getMonthExtension() {
    return this.monthExtensions.asObservable();
  }
  hunMonth = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December"
  ];
  deMonth = [
    'Januar',
    'Februar',
    'March',
    'April',
    'Mai',
    'June',
    'July',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',

  ];
  months = this.translateService.currentLang == 'hu' ? this.hunMonth : this.deMonth;
 
  hunDays = [
    "Vasárnap",
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    

  ];
  deDays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    ];
  dayNames = this.translateService.currentLang == 'hu' ? this.hunDays : this.deDays;

  dayCodes = [
    "V",
    "H",
    "K",
    "Sz",
    "Cs",
    "P",
    "Sz",
  ];

  setMonthsExtension(lang: string): Array<MonthExtension> {
    return new Array<MonthExtension>(

      { name: lang == 'hu' ? "Január" : 'Januar', value: 1, stringValue: "01" },
      { name: lang == 'hu' ? "Február" : 'Februar', value: 2, stringValue: "02" },
      { name: lang == 'hu' ? "Március" : 'March', value: 3, stringValue: "03" },
      { name: lang == 'hu' ? "Április" : 'April', value: 4, stringValue: "04" },
      { name: lang == 'hu' ? "Május" : 'Mai', value: 5, stringValue: "05" },
      { name: lang == 'hu' ? "Június" : 'June', value: 6, stringValue: "06" },
      { name: lang == 'hu' ? "Július" : 'July', value: 7, stringValue: "07" },
      { name: lang == 'hu' ? "Augusztus" : 'August', value: 8, stringValue: "08" },
      { name: lang == 'hu' ? "Szeptember" : 'September', value: 9, stringValue: "09" },
      { name: lang == 'hu' ? "Október" : 'Oktober', value: 10, stringValue: "10" },
      { name: lang == 'hu' ? "November" : 'November', value: 11, stringValue: "11" },
      { name: lang == 'hu' ? "December" : 'Dezember', value: 12, stringValue: "12" }
    );
  }
  constructor(private readonly translateService: TranslateService,
    private readonly datePipe: DatePipe,
    private readonly languageService: LanguageService) {
    this.translateService.onLangChange.subscribe(lang => {
      this.monthExtensions.next([...this.setMonthsExtension(lang.lang)])
    });
  }
  getMonthName(monthId: number): string {
    return this.months[monthId];
  }
  getDayName(day: Date): string {
    var result = this.dayNames[day.getDay()];
    return result;
  }
  getDayNameByLang(day: Date, lang: string): string {
    var result = lang == 'hu' ? this.hunDays[day.getDay()] : this.deDays[day.getDay()];
    return result;
  }
  getDayCode(day: Date): string {
    var result = this.dayCodes[day.getDay()];
    return result;
  }


  getMonday(d: Date) {
    const date = new Date(d);
    var day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  getTimes(n: number): number[] {
    return Array(n);
  }


  getDayDifference(from: Date, to: Date): number {
    if (from > to) return 0;
    else if (from === to)
      return 0;
    else {

      let milliFrom: number = from.valueOf();
      let milliTo: number = to.valueOf();
      let difDays: number = (milliTo - milliFrom) / (1000 * 60 * 60 * 24);
      return difDays;
    }
  }


  dayDifference(date1: Date, date2: Date): number {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }


  getYears(interval: number): Array<string> {
    const date = new Date();
    const years = new Array<string>();
    let dateStart = date.getFullYear();

    for (var i = 0; i < interval; i++) {

      years.push((dateStart + i).toString());
    }
    return years
  }



  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month - 1, 0).getDate();
  }
  getDateTextByCurrentLang(date: Date): string | null {
    let hu = this.datePipe.transform(date, 'yyyy.MM.dd');
    let de = this.datePipe.transform(date, 'dd.MM.yyyy');
    return this.translateService.currentLang == 'hu' && de != null && hu != null ?
      hu :
      de;
  }
}
