import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, forkJoin, Subscription } from 'rxjs';
import { CrapCostTableModel } from '../../../../models/crap-cost-table-model';
import { CrapCostProductModel, CrapCostWorkshopModel, EnumModel, GetCrapCostByProduct, GetCrapCostByWorkshop, IntervalModel, IntervalOption, SelectModel, ShiftModel, Views } from '../../../../models/generated/generated';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';


@Component({
  selector: 'app-workshop-crap-cost',
  templateUrl: './workshop-crap-cost.component.html',
  styleUrls: ['./workshop-crap-cost.component.scss']
})
export class WorkshopCrapCostComponent implements OnInit, OnDestroy {

  workshop: SelectModel;
  crapCostModel: CrapCostWorkshopModel;
  intervalOptions: Array<IntervalOption> = [
    { name: 'day', value: Views.Day, isDefault: true },
    { name: 'week', value: Views.Week, isDefault: false },
    { name: 'month', value: Views.Month, isDefault: false },
  ];
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  monthDataSubscription: Subscription;
  title = "crapcost";
  shifts: ShiftModel[];
  categories: EnumModel[];
  chartTitle: string | null;
  crapCostTableModels: Array<CrapCostTableModel>;
  max = 5;
  visibleitems: CrapCostTableModel[];
 
  constructor(private readonly qualityDataService: QualityDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService,
    private readonly shiftDataServie: ShiftDataService,
    private intervalPanelService: IntervalViewService) {
  }

  ngOnInit(): void {
    forkJoin([this.shiftDataServie.getAll(), this.defectDataService.getAllDefectCategories()]).subscribe(([shifts, categories]) => {
      this.shifts = shifts;
      this.categories = categories;
    });

    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        if (this.workshop) this.initalize();
      });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
  }

  initalize() {
    if (this.currentInterval) {
      this.crapCostTableModels = [...new Array<CrapCostTableModel>()];
      let request: GetCrapCostByWorkshop = {
        workshopId: this.workshop.id,
        startDate: this.currentInterval.startDate,
        endDate: this.currentInterval.endDate,
      }
      this.qualityDataService.getCrapCostByWorkshop(request).subscribe(reportModel => {
        this.max = 5;
        this.crapCostModel = reportModel;
        this.crapCostModel.products.forEach(p => {
          this.crapCostTableModels.push({ model: p, interval: this.currentInterval })
        });
        this.visibleitems = this.crapCostTableModels.slice(0, this.max);
      });
    };
  }

  onScrollDown(ev: any) {
    if (this.max <= this.crapCostTableModels.length) {
      this.max += 5;
      this.visibleitems = this.crapCostTableModels.slice(0, this.max);
    } 
  }

  onScrollUp(ev: any) {
    if (this.max > 5) {
      this.max -= 5
      this.visibleitems = this.crapCostTableModels.slice(0, this.max);
    } 
  }

  
  onSelected(event: SelectModel) {
    this.workshop = event;
    this.initalize();
  }

  ngOnDestroy() {
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
  }

}

