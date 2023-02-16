import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddSummaryCard, AddSummaryCardItem } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
@Component({
  selector: 'app-add-summary-card',
  templateUrl: './add-summary-card.component.html',
  styleUrls: ['./add-summary-card.component.scss']
})
export class AddSummaryCardComponent implements OnInit {
  cardForm!: UntypedFormGroup;
  originalCardForm!: UntypedFormGroup;
  title = "summarycard";
  get items(): FormArray {
    return this.cardForm.get('items') as FormArray;
  }

  constructor(
    private readonly summaryCardDataService: SummaryCardDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    private readonly accountService: AccountService) {
  }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      id: [ 0, [Validators.required]],
      date: [ new Date(), [Validators.required]],
      workerCode: ['', [Validators.required]],
      operation: [null, [Validators.required]],
      quantity: [ '', [Validators.required]],
      los: [ ''],
      shiftId: ['', [Validators.required]],
      items: this.formBuilder.array([])
    }).setOriginalForm();
    

  }

  onSave() {
    let items = new Array<AddSummaryCardItem>();
    this.items.controls.forEach(data => {
      if (data.value.quantity == "") data.value.quantity = 0;
      let item: AddSummaryCardItem = { defectId: data.value.defectId, comment: data.value.comment, quantity: data.value.quantity };
      items.push(item);
    });
    let date = new Date(this.cardForm.get('date')?.value);
    let currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    let model: AddSummaryCard = {
      date: currentDate,
      workerCode: this.cardForm.get('workerCode')?.value,
      operationId: this.cardForm.get('operation')?.value.id,
      quantity: this.cardForm.get('quantity')?.value,
      los: this.cardForm.get('los')?.value,
      shiftId: this.cardForm.get('shiftId')?.value,
      userId: this.accountService.getUserId(),
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
  hasUnsavedChanges(): boolean {
    return this.cardForm.isChanged();
  }
}
