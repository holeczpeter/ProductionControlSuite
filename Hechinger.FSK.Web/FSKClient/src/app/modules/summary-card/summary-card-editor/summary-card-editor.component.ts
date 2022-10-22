import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { DefectModel, GetDefectsByOperation, OperationModel, ShiftModel } from '../../../models/generated';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ShiftDataService } from '../../../services/data/shift-data.service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';
import { LanguageService } from '../../../services/language/language.service';


@Component({
  selector: 'app-summary-card-editor',
  templateUrl: './summary-card-editor.component.html',
  styleUrls: ['./summary-card-editor.component.scss']
})
export class SummaryCardEditorComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy,AfterViewInit {
  
  @Input() cardForm!: UntypedFormGroup;
  operations!: OperationModel[];
  shifts!: ShiftModel[];
  displayedColumns: Array<string> = ['order', 'defectName', 'quantity', 'comment'];
  dataSource = new MatTableDataSource<AbstractControl>();
  destroy$: Subject<any> = new Subject();
  imageSrc = 'assets/images/logo.png';
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<OperationModel[]> = new ReplaySubject<OperationModel[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;
  get items(): FormArray {
    return this.cardForm.get('items') as FormArray;
  }

  constructor(private readonly operationDataService: OperationDataService,
    private readonly shiftsDataService: ShiftDataService,
    private readonly defectsDataService: DefectDataService,
    private readonly summaryCardDataService: SummaryCardDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public languageService: LanguageService) { }
   

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<AbstractControl>();
    if (changes['cardForm'] && this.cardForm) {
      console.log(changes)
      forkJoin([this.getAllOperation(), this.getAllShifts()]).subscribe(([operations, shifts]) => {
        this.operations = operations;
        this.shifts = shifts;
        if (this.items.length > 0) this.dataSource.data = this.items.controls;
        this.valueChanges();
        this.filtered.next(this.operations.slice());
        this.filterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterItems();
          });
      })
    }
  }
  protected setInitialValue() {
    this.filtered
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.singleSelect) this.singleSelect.compareWith = (a: OperationModel, b: OperationModel) => a && b && a.id === b.id;
      });
  }

  protected filterItems() {
    if (!this.operations) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.operations.slice());
      return;
    }
    else search = search.toLowerCase();

    this.filtered.next(this.operations.filter(operation => operation.name.toLowerCase().indexOf(search) > -1));
  }
  valueChanges(): void {
    this.cardForm.get("operation")!
      .valueChanges
      .pipe(takeUntil(this.destroy$)).subscribe(value => {
        console.log(value)
        this.createTable();
      });
    this.cardForm.get("items")!
      .valueChanges
      .pipe(takeUntil(this.destroy$)).subscribe(value => {
      });
  }

  createTable() {
    let query: GetDefectsByOperation = { operationId: this.cardForm.get('operation')?.value.id }
    this.getDefectsByOperation(query).subscribe(results => {
      this.items.clear();
      results.forEach((d: DefectModel) => this.addRow(d));
      this.dataSource.data = this.items.controls;
      this.changeDetectorRef.detectChanges();
    });
    
  }
  addRow(d: DefectModel) {
    const row = this.formBuilder.group({
      'id': [0],
      'order': [1],
      'defectId': [d.id],
      'defectName': [d.name],
      'quantity': [0],
      'comment': [''],

    });
    this.items.push(row);
  }

  getSummaryCard() {
    return this.summaryCardDataService.get(this.cardForm.get('id')?.value);
  }
  getAllOperation() {
    return this.operationDataService.getAll();
  }
  getAllShifts() {
    return this.shiftsDataService.getAll();
  }
  getDefectsByOperation(request: GetDefectsByOperation) {
    return this.defectsDataService.getByOperation(request);
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
