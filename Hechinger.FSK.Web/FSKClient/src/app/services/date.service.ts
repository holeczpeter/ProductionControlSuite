import { Injectable } from '@angular/core';
import { MonthExtension } from '../models/generated';

@Injectable({
  providedIn: 'root'
})
export class DateService {
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
  days = [
    "Vasárnap",
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",

  ];
  dayCodes = [
    "V",
    "H",
    "K",
    "Sz",
    "Cs",
    "P",
    "Sz",
  ];
  getMonthsExtension(): Array<MonthExtension> {
    return new Array<MonthExtension>(

      { name: "Január", value: 1, stringValue: "01" },
      { name: "Február", value: 2, stringValue: "02" },
      { name: "Március", value: 3, stringValue: "03" },
      { name: "Április", value: 4, stringValue: "04" },
      { name: "Május", value: 5, stringValue: "05" },
      { name: "Június", value: 6, stringValue: "06" },
      { name: "Július", value: 7, stringValue: "07" },
      { name: "Augusztus", value: 8, stringValue: "08" },
      { name: "Szeptember", value: 9, stringValue: "09" },
      { name: "Október", value: 10, stringValue: "10" },
      { name: "November", value: 11, stringValue: "11" },
      { name: "December", value: 12, stringValue: "12" }
    );
  }
  constructor() { }
  getMonthName(monthId: number): string {
    return this.months[monthId];
  }


  getDayName(day: Date): string {
    var result = this.days[day.getDay()];
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

}
