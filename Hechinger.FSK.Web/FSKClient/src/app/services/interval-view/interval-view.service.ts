import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { differenceInCalendarDays, endOfMonth, endOfWeek, endOfYear, getWeek, startOfMonth, startOfWeek, startOfYear } from 'date-fns';
import { BehaviorSubject, Subject } from 'rxjs';
import { IntervalModel, IntervalOption, Views } from '../../models/generated/generated';
import { DateService } from '../date.service';

@Injectable({
  providedIn: 'root'
})
export class IntervalViewService {

  currentDate = new Date();
  startDate = startOfMonth(this.currentDate);
  endDate = endOfMonth(this.currentDate);

  private subject = new Subject<IntervalModel>();
  public getCurrentIntervalModel() {
    return this.subject.asObservable();
  }

  private options = new BehaviorSubject(this.setOptions(this.translateService.currentLang));

  setOptions(lang: string) {
    return [
      { name: lang == 'hu' ? 'Nap' : 'Tag', value: Views.Day, isDefault: false },
      { name: lang == 'hu' ? 'Év' : 'Jahre', value: Views.Year, isDefault: false },
      { name: lang == 'hu' ? 'Hónap' : 'Monat', value: Views.Month, isDefault: true },
      { name: lang == 'hu' ? 'Hét' : 'Woche', value: Views.Week, isDefault: false },
    ];
  }
  public getOptions() {
    return this.options.asObservable();
  }
  constructor(private dateService: DateService, private readonly translateService: TranslateService) {
    this.translateService.onLangChange.subscribe(lang => {
      this.setOptions(lang.lang);
    });
  }

  setInitial(view: Views) {
    this.subject.next(this.set(Views.Month, new Date()));
  }

  private set(selectedView: Views, currentDate: Date): IntervalModel {

    switch (selectedView) {
      case Views.Day: {
        this.startDate = currentDate;
        this.endDate = currentDate;
        break;
      }
      case Views.Week: {
        this.startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
        this.endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
        break;
      }
      case Views.Month: {
        this.startDate = startOfMonth(currentDate);
        this.endDate = endOfMonth(currentDate);
        break;
      }
      case Views.Year: {
        this.startDate = startOfYear(currentDate);
        this.endDate = endOfYear(currentDate);
        break;
      }
      default: {
        break;
      }
    };
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      differenceInCalendarDays: differenceInCalendarDays(this.endDate, this.startDate),
      selectedView: selectedView,
      currentMonth: currentDate.getMonth() + 1,
      currentMonthName: this.dateService.getMonthName(currentDate.getMonth()),
      currentYear: currentDate.getFullYear(),
      currentWeek: getWeek(currentDate, { weekStartsOn: 1 }),
     
    }
  }

  setViews(selectedView: Views, currentDate: Date) {
    this.currentDate = currentDate;
    this.subject.next(this.set(selectedView, currentDate));
  }

  setInterval(selectedView: Views, startDate: Date, endDate: Date) {

    this.startDate = startDate;
    this.endDate = endDate;
    this.subject.next({
      startDate: this.startDate,
      endDate: this.endDate,
      differenceInCalendarDays: differenceInCalendarDays(this.endDate, this.startDate),
      selectedView: selectedView,
      currentMonth: this.startDate.getMonth() + 1,
      currentMonthName: this.dateService.getMonthName(this.startDate.getMonth()),
      currentYear: this.startDate.getFullYear(),
      currentWeek: getWeek(this.startDate, { weekStartsOn: 1 }),
      
    });
  }
}
