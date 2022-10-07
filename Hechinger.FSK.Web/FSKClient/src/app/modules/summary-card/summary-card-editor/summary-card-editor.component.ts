import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { AddSummaryCard, AddSummaryCardItem, GetDefectsByOperation, OperationModel, ShiftModel, SummaryCardDetailModel, SummaryCardItemModel, UpdateSummaryCard, UpdateSummaryCardItem } from '../../../models/generated';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ShiftDataService } from '../../../services/data/shift-data.service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';


@Component({
  selector: 'app-summary-card-editor',
  templateUrl: './summary-card-editor.component.html',
  styleUrls: ['./summary-card-editor.component.scss']
})
export class SummaryCardEditorComponent implements OnInit, OnDestroy {
  @Input() id: number = 0;
  summaryCard!: SummaryCardDetailModel;
  operations!: OperationModel[];
  shifts!: ShiftModel[];
  dataSource!: MatTableDataSource<SummaryCardItemModel>;
  displayedColumns: Array<string> = ['order', 'defectName', 'quantity', 'comment'];
  cardForm!: UntypedFormGroup;
  destroy$: Subject<any> = new Subject();
  items!: Array<SummaryCardItemModel>;
  imageSrc = 'assets/images/logo.png';
  constructor(private readonly operationDataService: OperationDataService,
    private readonly shiftsDataService: ShiftDataService,
    private readonly defectsDataService: DefectDataService,
    private readonly summaryCardDataService: SummaryCardDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) { }

  ngOnInit(): void {
    forkJoin([this.getSummaryCard(), this.getAllOperation(), this.getAllShifts()]).subscribe(([summaryCard, operations, shifts]) => {
      if (summaryCard) {
        this.summaryCard = summaryCard;
        this.items = summaryCard ? summaryCard.items : new Array<SummaryCardItemModel>();
        console.log(this.items)
        this.dataSource = new MatTableDataSource(this.items);
      }
      
      this.operations = operations;
      this.shifts = shifts;
      this.initalize();
    })
  }
  initalize() {
    //this.dataSource = new MatTableDataSource<SummaryCardItemModel>();
    this.createForm();
  }
  createForm() {
    
    this.cardForm = this.formBuilder.group({
      id: [this.summaryCard ? this.summaryCard.id : 0, [Validators.required]],
      date: [this.summaryCard ? this.summaryCard.date : '', [Validators.required]],
      worker: [this.summaryCard ? this.summaryCard.worker : '', [Validators.required]],
      operationId: [this.summaryCard ? this.summaryCard.operationId : 0, [Validators.required]],
      quantity: [this.summaryCard ? this.summaryCard.quantity :0, [Validators.required]],
      los: [this.summaryCard ? this.summaryCard.quantity : ''],
      shiftId: [this.summaryCard ? this.summaryCard.shiftId :'', [Validators.required]],
    });
    this.valueChanges();
  }
  valueChanges(): void {
    //startWith(this.cardForm.get('operationId')!.value)
    this.cardForm.get("operationId")!
      .valueChanges
      .pipe(takeUntil(this.destroy$)).subscribe(value => {
        this.createTable();
      });
  }
  createTable() {
    console.log(this.createTable)
    this.items = new Array<SummaryCardItemModel>();
    let query: GetDefectsByOperation = { operationId: this.cardForm.get('operationId')?.value }
    this.getDefectsByOperation(query).subscribe(results => {
      results.forEach(result => {
        let item: SummaryCardItemModel = { order: 1, id: 0, defectId: result.id, defectName: result.name, quantity: 0, comment: '' }
        this.items.push(item)
      });
      this.dataSource = new MatTableDataSource(this.items);
    });
    
  }
  getSummaryCard() {
    return this.summaryCardDataService.get(this.id);
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
  onSave() {
    this.cardForm.get('id')?.value == 0 ? this.onAdd() : this.onUpdate();
  }
  onAdd() {
    let items = new Array<AddSummaryCardItem>();
    this.dataSource.data.forEach(data => {
      let item: AddSummaryCardItem = { defectId: data.defectId, comment: data.comment, quantity: data.quantity };
      items.push(item);
    });
    let model: AddSummaryCard = {
      date: this.cardForm.get('date')?.value,
      worker: this.cardForm.get('worker')?.value,
      operationId: this.cardForm.get('operationId')?.value,
      quantity: this.cardForm.get('quantity')?.value,
      los: this.cardForm.get('los')?.value,
      shiftId: this.cardForm.get('shiftId')?.value,
      items: items
    }

    this.summaryCardDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.initalize();

    });
  }
  onUpdate() {
    let items = new Array<UpdateSummaryCardItem>();
    this.dataSource.data.forEach(data => {
      let item: UpdateSummaryCardItem = { id: data.id, defectId: data.defectId, comment: data.comment, quantity: data.quantity };
      items.push(item);
    });
    let model: UpdateSummaryCard = {
      id: this.cardForm.get('id')?.value,
      date: this.cardForm.get('date')?.value,
      worker: this.cardForm.get('worker')?.value,
      operationId: this.cardForm.get('operationId')?.value,
      quantity: this.cardForm.get('quantity')?.value,
      los: this.cardForm.get('los')?.value,
      shiftId: this.cardForm.get('shiftId')?.value,
      items: items
    }

    this.summaryCardDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.initalize();

    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
