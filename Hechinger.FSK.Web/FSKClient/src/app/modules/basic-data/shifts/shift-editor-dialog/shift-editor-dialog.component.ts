import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddShift, ShiftModel, UpdateShift } from '../../../../models/generated';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-shift-editor-dialog',
  templateUrl: './shift-editor-dialog.component.html',
  styleUrls: ['./shift-editor-dialog.component.scss']
})
export class ShiftEditorDialogComponent implements OnInit {
  title!: string;
  formGroup: UntypedFormGroup;
  constructor(private readonly dialogRef: MatDialogRef<ShiftEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShiftModel,
    private readonly shiftDataService: ShiftDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
    this.title = data ? "shifts.edit" : "shifts.add";
    this.formGroup = this.formBuilder.group({
      id: [this.data ? this.data.id : '0', [Validators.required]],
      name: [this.data ? this.data.name : '', [Validators.required]],
      shortName: [this.data ? this.data.shortName : '', [Validators.required]],
      translatedName: [this.data ? this.data.translatedName : '', [Validators.required]],
      translatedShortName: [this.data ? this.data.translatedShortName : '', [Validators.required]],
      start: [this.data ? this.data.start : '00:00', [Validators.pattern('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'), Validators.required]],
      end: [this.data ? this.data.end : '00:00', [Validators.pattern('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'), Validators.required]],
    });
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
    this.dialogRef.close(false);
  }
}



