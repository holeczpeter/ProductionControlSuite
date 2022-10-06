import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddWorkshop, UpdateWorkshop, WorkshopModel } from '../../../../models/generated';
import { WorkshopDataService } from '../../../../services/data/workshop-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';


@Component({
  selector: 'app-workshop-editor-dialog',
  templateUrl: './workshop-editor-dialog.component.html',
  styleUrls: ['./workshop-editor-dialog.component.scss']
})
export class WorkshopEditorDialogComponent implements OnInit {
  title!: string;
  formGroup: UntypedFormGroup;
  constructor(private readonly dialogRef: MatDialogRef<WorkshopEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkshopModel,
    private readonly workshopDataService: WorkshopDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
    this.title = data ? "workshops.edit" : "workshops.add";
    this.formGroup = this.formBuilder.group({
      id: [this.data ? this.data.id : '0', [Validators.required]],
      name: [this.data ? this.data.name : '', [Validators.required]],
      translatedName: [this.data ? this.data.translatedName : '', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddWorkshop = {
      name: this.formGroup.get('name')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
    };
    this.workshopDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);

    });
  }

  update() {
    let model: UpdateWorkshop = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
    };
    this.workshopDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}


