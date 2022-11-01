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
  days = new BehaviorSubject<Array<string>>(this.setDays(this.translateService.currentLang));
  getDays() {
    return this.days.asObservable();
  }
  months = [
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
    "December"];

  setDays(lang: string) {
    return lang == 'hu' ? [
      "Hétfő",
      "Kedd",
      "Szerda",
      "Csütörtök",
      "Péntek",
      "Szombat",
      "Vasárnap"

    ] : [
      
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
        "Samstag",
        "Sonntag",
    ]
  }
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
  constructor(private readonly translateService: TranslateService, private readonly languageService: LanguageService) {
    this.translateService.onLangChange.subscribe(lang => {
      this.monthExtensions.next([...this.setMonthsExtension(lang.lang)])
    });
  }
  getMonthName(monthId: number): string {
    return this.months[monthId];
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

}
