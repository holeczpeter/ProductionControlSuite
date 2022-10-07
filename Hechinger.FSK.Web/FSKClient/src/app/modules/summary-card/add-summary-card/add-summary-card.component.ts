import { Component, OnInit } from '@angular/core';
import { SummaryCardDetailModel } from '../../../models/generated';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { AddSummaryCard, AddSummaryCardItem, GetDefectsByOperation, OperationModel, ShiftModel, SummaryCardItemModel, UpdateSummaryCard, UpdateSummaryCardItem } from '../../../models/generated';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ShiftDataService } from '../../../services/data/shift-data.service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
@Component({
  selector: 'app-add-summary-card',
  templateUrl: './add-summary-card.component.html',
  styleUrls: ['./add-summary-card.component.scss']
})
export class AddSummaryCardComponent implements OnInit {
  
  cardForm!: UntypedFormGroup;
  title = "summarycard";
  get items(): FormArray {
    return this.cardForm.get('items') as FormArray;
  }

  constructor(
    private readonly summaryCardDataService: SummaryCardDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
  }

  ngOnInit(): void {

    this.cardForm = this.formBuilder.group({
      id: [ 0, [Validators.required]],
      date: [ new Date(), [Validators.required]],
      worker: ['', [Validators.required]],
      operationId: [  0, [Validators.required]],
      quantity: [ 0, [Validators.required]],
      los: [ ''],
      shiftId: ['', [Validators.required]],
      items: this.formBuilder.array([])
    });
  }

  onSave() {
    let items = new Array<AddSummaryCardItem>();
    this.items.controls.forEach(data => {
      let item: AddSummaryCardItem = { defectId: data.value.defectId, comment: data.value.comment, quantity: data.value.quantity };
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
      if (result.isSuccess) {
        this.items.clear();
        this.ngOnInit();
      } 

    });
  }
}
