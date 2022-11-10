import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { concatMap, forkJoin, map } from 'rxjs';
import { SelectModel, SummaryCardDetailModel, SummaryCardItemModel, UpdateSummaryCard, UpdateSummaryCardItem } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
@Component({
  selector: 'app-summary-card-editor-dialog',
  templateUrl: './summary-card-editor-dialog.component.html',
  styleUrls: ['./summary-card-editor-dialog.component.scss']
})
export class SummaryCardEditorDialogComponent implements OnInit {
  title!: string;
  summaryCard!: SummaryCardDetailModel;
  cardForm!: UntypedFormGroup;
  isSaved: boolean = false;
  get items(): FormArray {
    return this.cardForm.get('items') as FormArray;
  }
  constructor(private readonly dialogRef: MatDialogRef<SummaryCardEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly summaryCardDataService: SummaryCardDataService,
    private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    private readonly accountService: AccountService) {
    this.title = "summarycard.edit";
  }

  ngOnInit(): void {
    this.summaryCardDataService.get(this.data).pipe(
      concatMap(card => forkJoin([this.operationDataService.get({ id: card.operationId })])
       .pipe(map(operation => ({ card, operation })))))
      .subscribe(results => {
        this.summaryCard = results.card;
        let currentOperation: SelectModel = {
          id: results.operation[0].id,
          code: results.operation[0].code,
          name: results.operation[0].name,
          translatedName: results.operation[0].translatedName,
        };
        this.cardForm = this.formBuilder.group({
          id: [this.summaryCard ? this.summaryCard.id : 0, [Validators.required]],
          date: [this.summaryCard ? this.summaryCard.date : '', [Validators.required]],
          worker: [this.summaryCard ? this.summaryCard.worker : '', [Validators.required]],
          operation: [this.summaryCard ? currentOperation : null, [Validators.required]],
          quantity: [this.summaryCard ? this.summaryCard.quantity : 0, [Validators.required]],
          los: [this.summaryCard ? this.summaryCard.quantity : ''],
          shiftId: [this.summaryCard ? this.summaryCard.shiftId : '', [Validators.required]],
          items: this.formBuilder.array([])
        });
        console.log(this.cardForm)
        this.summaryCard.items.forEach((d: SummaryCardItemModel) => this.addRow(d));
      });


    
   
  }
  addRow(d: SummaryCardItemModel) {
    const row = this.formBuilder.group({
      'id': [d.id],
      'order': [1],
      'defectId': [d.defectId],
      'defectName': [d.defectName],
      'quantity': [d.quantity],
      'comment': [d.comment],

    });
    this.items.push(row);
  }
  onSave() {
    let items = new Array<UpdateSummaryCardItem>();
    this.items.controls.forEach(data => {
      let item: UpdateSummaryCardItem = { id: data.value.id, defectId: data.value.defectId, comment: data.value.comment, quantity: data.value.quantity };
      items.push(item);
    });
    let model: UpdateSummaryCard = {
      id: this.cardForm.get('id')?.value,
      date: this.cardForm.get('date')?.value,
      worker: this.cardForm.get('worker')?.value,
      operationId: this.cardForm.get('operation')?.value.id,
      quantity: this.cardForm.get('quantity')?.value,
      los: this.cardForm.get('los')?.value,
      shiftId: this.cardForm.get('shiftId')?.value,
      userId: this.accountService.getUserId(),
      items: items
    }

    this.summaryCardDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) {
        this.isSaved = true;
        this.ngOnInit();
      } 

    });
  }
  onCancel() {
    this.dialogRef.close(this.isSaved);
  }
}
