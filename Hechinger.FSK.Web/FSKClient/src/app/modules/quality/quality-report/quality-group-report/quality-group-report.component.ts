import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EnumModel, GetGroupReport, GroupReportModel, IntervalModel, ShiftModel, Views } from '../../../../models/generated/generated';
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
  @Input() interval: IntervalModel;
  result: GroupReportModel;
  items: Array<Quality>;

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
    if ((changes["request"] && this.request) || (changes["interval"] && this.interval)) this.initalize();
  }

  initalize() {
    if (this.interval && this.request) {
    forkJoin([this.qualityDataService.getGroupReport(this.request)]).subscribe(([ result]) => {
     
      console.log(result)
      this.result = result;
      //this.items = new Array<Quality>();
      //if (result && result.items) {
      //  result.items.forEach(x => {
      //    let table: QuantityTableModel = {
      //      interval: this.interval,
      //      model: x
      //    };
      //    let item: Quality = {
      //      chartTitle: "title",
      //      tableModel: table
      //    };
      //    this.items.push(item)
      //  })

      //}
      //this.result = result;
      //console.log(this.items)
    });
    }
  }
}
