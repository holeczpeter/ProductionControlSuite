import { DatePipe, LowerCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DefectCategories, IntervalModel, Views } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private translateService: TranslateService,
    private lowerCasePipe: LowerCasePipe,
    private datePipe: DatePipe) {

  }

  getColor(category: DefectCategories): string {
    switch (category) {
      case 0: return '#FFCA39';
      case 1: return '#379DDA';
      case 2: return '#F35B5A';
      default: return '#F35B5A';
    }
  }
  getChartInterval(intervalModel: IntervalModel): string | null {
    switch (intervalModel.selectedView) {
      case Views.Day:
        return this.translateService.currentLang == 'hu' ?
          this.datePipe.transform(intervalModel.startDate, 'yyyy.MM.dd') :
          this.datePipe.transform(intervalModel.startDate, 'dd.MM.yyyy');
      case Views.Week:
        return intervalModel.currentYear.toString() + ". " +
          intervalModel.currentWeek.toString() + ". " +
          this.lowerCasePipe.transform(this.translateService.instant('week'));
      case Views.Month:
        return intervalModel.currentYear.toString() + ". " + intervalModel.currentMonthName.toString();
      case Views.Year:
        return intervalModel.currentYear.toString();
      default:
        return this.translateService.currentLang == 'hu' ?
          this.datePipe.transform(intervalModel.startDate, 'yyyy.MM.dd') :
          this.datePipe.transform(intervalModel.startDate, 'dd.MM.yyyy');
    }
  }
}
