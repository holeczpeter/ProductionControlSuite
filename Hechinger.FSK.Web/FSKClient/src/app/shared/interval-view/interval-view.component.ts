import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { addDays, addMonths, addYears, subDays, subMonths, subYears } from 'date-fns';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { IntervalModel, IntervalOption, Views } from '../../models/generated/generated';
import { DateService } from '../../services/date.service';
import { IntervalViewService } from '../../services/interval-view/interval-view.service';
@Component({
  selector: 'app-interval-view',
  templateUrl: './interval-view.component.html',
  styleUrls: ['./interval-view.component.scss']
})
export class IntervalViewComponent implements OnInit, OnChanges, DoCheck, OnDestroy {

  @Input() intervalViewModel!: IntervalModel;
  @Input() intervalOptions!: Array<IntervalOption>;
  currentDate: Date = new Date();
  selectedView: Views;
  subscription: Subscription;
  startDate: Date;
  endDate: Date;
  private _differ: IterableDiffer<any>;
  public get views(): typeof Views {
    return Views;
  }

  constructor(public dateService: DateService,
    public intervalViewService: IntervalViewService,
    private differs: IterableDiffers) {
    this._differ = this.differs.find([]).create();
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.intervalViewService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe(x => {
        this.startDate = x.startDate;
        this.endDate = x.endDate;
        this.intervalViewModel = x;
        this.selectedView = x.selectedView;
      });
  }

  ngOnInit(): void {
  }
  ngDoCheck() {
    var changes = this._differ.diff(this.intervalOptions);
    if (changes) {
      this.selectedView = this.intervalOptions ? this.intervalOptions!.find(x => x.isDefault == true)!.value : Views.Month;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  public selectionChanged(event:any): void {
    this.intervalViewService.setViews(event, this.currentDate);
  }
  public nextYear(): void {
    this.currentDate = addYears(this.currentDate, 1);
    this.intervalViewService.setViews(Views.Year, this.currentDate);
  }

  public previousYear(): void {
    this.currentDate = subYears(this.currentDate, 1);
    this.intervalViewService.setViews(Views.Year, this.currentDate);
  }

  public nextMonth(): void {
    this.currentDate = addMonths(this.currentDate, 1);
    this.intervalViewService.setViews(Views.Month, this.currentDate);
  }

  public previousMonth(): void {
    this.currentDate = subMonths(this.currentDate, 1);
    this.intervalViewService.setViews(Views.Month, this.currentDate);
  }

  public nextWeek(): void {
    this.currentDate = addDays(this.currentDate, 7);
    this.intervalViewService.setViews(Views.Week, this.currentDate);
  }

  public previousWeek(): void {
    this.currentDate = subDays(this.currentDate, 7);
    this.intervalViewService.setViews(Views.Week, this.currentDate);
  }
 
  
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

