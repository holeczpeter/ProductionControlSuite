import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EnumModel, GetGroupReport, GroupReportModel, ShiftModel, Views } from '../../../../models/generated/generated';
import { QuantityTableModel } from '../../../../models/quantity-table-model';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';
export interface Quality {
  tableModel: QuantityTableModel;
  chartTitle: string;
}

@Component({
  selector: 'app-quality-group-report',
  templateUrl: './quality-group-report.component.html',
  styleUrls: ['./quality-group-report.component.scss']
})
export class QualityGroupReportComponent implements OnInit, OnChanges {
  @Input() request: GetGroupReport;
  result: GroupReportModel;
  items: Array<Quality>;
  shifts: ShiftModel[];
  categories: EnumModel[];
  constructor(private readonly qualityDataService: QualityDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private intervalPanelService: IntervalViewService,
    private productDataService: ProductDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService,
    private readonly shiftDataServie: ShiftDataService,) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["request"] && this.request) this.initalize();
  }

  initalize() {
    console.log(this.request)
    forkJoin([this.shiftDataServie.getAll(),
    this.defectDataService.getAllDefectCategories(),
    this.qualityDataService.getGroupReport(this.request)]).subscribe(([shifts, categories, result]) => {
      console.log(shifts)
      console.log(categories)
      console.log(result)
      //console.log(interval)
      this.shifts = shifts;
      this.categories = categories;
      this.items = new Array<Quality>();
      console.log(result)
      if (result && result.items) {
        result.items.forEach(x => {
          let table: QuantityTableModel = {
            interval: {
              startDate: new Date(),
              endDate: new Date(),
              differenceInCalendarDays: 7,
              selectedView: Views.Month,
              currentMonth: 12,
              currentMonthName: "December",
              currentYear: 2022,
              currentWeek: 52,
            },
            model: x
          };
          let item: Quality = {
            chartTitle: "title",
            tableModel: table
          };
          this.items.push(item)
        })

      }
      this.result = result;
      console.log(this.items)
    });

  }
}
