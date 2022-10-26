import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, forkJoin, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { DefectModel, GetDefectsByOperation, GetOperation, OperationModel, SelectModel, ShiftModel } from '../../../models/generated/generated';
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
  operations!: SelectModel[];
  shifts!: ShiftModel[];
  displayedColumns: Array<string> = ['order', 'defectName', 'quantity', 'comment'];
  dataSource = new MatTableDataSource<AbstractControl>();
  destroy$: Subject<any> = new Subject();
  imageSrc = 'assets/images/logo.png';
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
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
      let currentOperationId = this.cardForm && this.cardForm.get('operation') && this.cardForm.get('operation')!.value != null && this.cardForm.get('operation')?.value.id ? this.cardForm.get('operation')?.value.id : 0;
      forkJoin([this.getCurrentOperation({ id: currentOperationId}), this.getOperationSelectModel(''), this.getAllShifts()]).subscribe(([currentOperation,operations, shifts]) => {
        this.operations = operations;
        if (currentOperation) this.operations.splice(0, 0, { id: currentOperation.id, code: currentOperation.code, name: currentOperation.name, translatedName: currentOperation.translatedName });
        this.shifts = shifts;
        if (this.items.length > 0) this.dataSource.data = this.items.controls;
        this.valueChanges();
        this.filterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
          debounceTime(500)).subscribe(filter => {
            this.filter();
          })
        this.filtered.next(this.operations.slice());
      })
    }
  }
  filter(): void {
    if (!this.operations) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.operations.slice());
      return;
    }
    else search = search.toLowerCase();
    this.getOperationSelectModel(search).subscribe((result: any) => {
      this.operations = result;
      this.filtered.next(this.operations.slice());
    });
  }
  valueChanges(): void {
    this.cardForm.get("operation")!
      .valueChanges
      .pipe(takeUntil(this.destroy$)).subscribe(value => {
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
      'defectTranslatedName': [d.translatedName],
      'quantity': [0],
      'comment': [''],

    });
    this.items.push(row);
  }

  getSummaryCard() {
    return this.summaryCardDataService.get(this.cardForm.get('id')?.value);
  }
  getCurrentOperation(request: GetOperation) {
    return this.operationDataService.get(request);
  }
  getOperationSelectModel(filter:string) {
    return this.operationDataService.getSelectModel(filter);
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
   
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
