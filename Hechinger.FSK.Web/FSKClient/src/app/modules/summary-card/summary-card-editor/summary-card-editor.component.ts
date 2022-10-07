import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { DefectModel, GetDefectsByOperation, OperationModel, ShiftModel } from '../../../models/generated';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ShiftDataService } from '../../../services/data/shift-data.service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';


@Component({
  selector: 'app-summary-card-editor',
  templateUrl: './summary-card-editor.component.html',
  styleUrls: ['./summary-card-editor.component.scss']
})
export class SummaryCardEditorComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  
  @Input() cardForm!: UntypedFormGroup;
  operations!: OperationModel[];
  shifts!: ShiftModel[];
  displayedColumns: Array<string> = ['order', 'defectName', 'quantity', 'comment'];
  dataSource = new MatTableDataSource<AbstractControl>();
  destroy$: Subject<any> = new Subject();
  imageSrc = 'assets/images/logo.png';
  get items(): FormArray {
    return this.cardForm.get('items') as FormArray;
  }

  constructor(private readonly operationDataService: OperationDataService,
    private readonly shiftsDataService: ShiftDataService,
    private readonly defectsDataService: DefectDataService,
    private readonly summaryCardDataService: SummaryCardDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef) { }
   

  ngOnInit(): void {
    forkJoin([this.getAllOperation(), this.getAllShifts()]).subscribe(([ operations, shifts]) => {
      this.operations = operations;
      this.shifts = shifts;
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<AbstractControl>();
    if (changes['cardForm'] && this.cardForm) {
      if (this.items.length > 0) this.dataSource.data = this.items.controls;
      this.valueChanges();
    }
  }
  
  valueChanges(): void {
    this.cardForm.get("operationId")!
      .valueChanges
      .pipe(takeUntil(this.destroy$)).subscribe(value => {
        console.log(value)
        this.createTable();
      });
    this.cardForm.get("items")!
      .valueChanges
      .pipe(takeUntil(this.destroy$)).subscribe(value => {
        console.log(this.items)
      });
  }

  createTable() {
    let query: GetDefectsByOperation = { operationId: this.cardForm.get('operationId')?.value }
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
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
