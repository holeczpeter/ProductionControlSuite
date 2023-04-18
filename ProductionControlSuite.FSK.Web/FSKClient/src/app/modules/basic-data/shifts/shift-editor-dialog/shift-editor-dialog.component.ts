import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AddShift, ShiftModel, UpdateShift } from '../../../../models/generated/generated';
import { ConfirmDialogService } from '../../../../services/confirm-dialog/confirm-dialog-service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-shift-editor-dialog',
  templateUrl: './shift-editor-dialog.component.html',
  styleUrls: ['./shift-editor-dialog.component.scss']
})
export class ShiftEditorDialogComponent implements OnInit, OnDestroy {
  title!: string;
  formGroup: UntypedFormGroup;
  protected onDestroy$ = new Subject<void>();

  constructor(private readonly dialogRef: MatDialogRef<ShiftEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShiftModel,
    private readonly shiftDataService: ShiftDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly snackBar: SnackbarService) {
    this.title = data ? "shifts.edit" : "shifts.add";
    this.formGroup = this.formBuilder.group({
      id: [this.data ? this.data.id : '0', [Validators.required]],
      name: [this.data ? this.data.name : '', [Validators.required]],
      shortName: [this.data ? this.data.shortName : '', [Validators.required]],
      translatedName: [this.data ? this.data.translatedName : '', [Validators.required]],
      translatedShortName: [this.data ? this.data.translatedShortName : '', [Validators.required]],
      start: [this.data ? this.data.start : '00:00', Validators.required],
      end: [this.data ? this.data.end : '00:00',  Validators.required],
    }).setOriginalForm();
  }

  ngOnInit(): void {
  }

  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddShift = {
      name: this.formGroup.get('name')?.value,
      shortName: this.formGroup.get('shortName')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      translatedShortName: this.formGroup.get('translatedShortName')?.value,
      start: this.formGroup.get('start')?.value,
      end: this.formGroup.get('end')?.value,
    };
    this.shiftDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);

    });
  }

  update() {
    let model: UpdateShift = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      shortName: this.formGroup.get('shortName')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      translatedShortName: this.formGroup.get('translatedShortName')?.value,
      start: this.formGroup.get('start')?.value,
      end: this.formGroup.get('end')?.value,
    };
    this.shiftDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    if (this.formGroup.isChanged()) this.confirmDialogService.confirmClose(this.dialogRef);
    else this.dialogRef.close(false);
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}



