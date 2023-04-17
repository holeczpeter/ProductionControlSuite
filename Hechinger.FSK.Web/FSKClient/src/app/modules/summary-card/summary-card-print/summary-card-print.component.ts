import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, forkJoin, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { OperationPrintModel, SelectModel } from '../../../models/generated/generated';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { LanguageService } from '../../../services/language/language.service';
@Component({
  selector: 'app-summary-card-print',
  templateUrl: './summary-card-print.component.html',
  styleUrls: ['./summary-card-print.component.scss']
})
export class SummaryCardPrintComponent implements OnInit, AfterViewChecked, OnDestroy, AfterViewInit {
  title = "print";
  operations!: SelectModel[];
  destroy$: Subject<any> = new Subject();
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  protected onDestroy$ = new Subject<void>();
  formGroup: UntypedFormGroup;
  @ViewChild('singleSelect') singleSelect: MatSelect;

  constructor(private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public languageService: LanguageService) { }

  ngOnInit(): void {
    forkJoin([this.operationDataService.getByFilter('')]).pipe(takeUntil(this.onDestroy$)).subscribe(([ operations]) => {
      this.operations = operations;
      this.formGroup = this.formBuilder.group({
        operation: [null, [Validators.required]],
      });
      this.filterCtrl.valueChanges.pipe(takeUntil(this.onDestroy$),
        debounceTime(500)).subscribe(filter => {
          this.filter();
        })
      this.filtered.next(this.operations.slice());
    })
  }
  filter(): void {
    if (!this.operations) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.operations.slice());
      return;
    }
    else search = search.toLowerCase();
    this.operationDataService.getByFilter(search).pipe(takeUntil(this.onDestroy$)).subscribe((result: any) => {
      this.operations = result;
      this.filtered.next(this.operations.slice());
    });
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  ngAfterViewInit() {

  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.filtered.next([]);
    this.filtered.complete();
  }
}
