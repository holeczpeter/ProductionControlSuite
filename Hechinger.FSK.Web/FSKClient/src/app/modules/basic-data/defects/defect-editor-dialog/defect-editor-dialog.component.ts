import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { DefectEditorModel } from '../../../../models/dialog-models/defect-editor-model';
import { OperationEditorModel } from '../../../../models/dialog-models/operation-editor-model';
import { AddDefect, AddOperation, DefectModel, EnumModel, OperationModel, ProductModel, UpdateDefect, UpdateOperation } from '../../../../models/generated';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-defect-editor-dialog',
  templateUrl: './defect-editor-dialog.component.html',
  styleUrls: ['./defect-editor-dialog.component.scss']
})
export class DefectEditorDialogComponent implements OnInit {
  title!: string;
  defect!: DefectModel | null;
  formGroup: UntypedFormGroup;
  operations!: OperationModel[];
  categories!: EnumModel[];
  constructor(private readonly dialogRef: MatDialogRef<DefectEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DefectEditorModel,
    private readonly defectDataService: DefectDataService,
    private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
    this.defect = data ? data.defectModel : null;
    this.title = this.defect ? "defects.edit" : "defects.add";
    this.formGroup = this.formBuilder.group({
      id: [this.defect && !data.isCopy ? this.defect.id : '0', [Validators.required]],
      name: [this.defect ? this.defect.name : '', [Validators.required]],
      code: [this.defect ? this.defect.code : '', [Validators.required]],
      translatedName: [this.defect ? this.defect.translatedName : '', [Validators.required]],
      defectCategory: [this.defect ? this.defect.defectCategory : '', [Validators.required]],
      operationId: [this.defect ? this.defect.operationId : '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    forkJoin([this.operationDataService.getAll(), this.defectDataService.getAllDefectCategories()]).subscribe(([operations, categories]) => {
      this.operations = operations;
      this.categories = categories;
    })
  }

  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddDefect = {
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      defectCategory: this.formGroup.get('defectCategory')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      operationId: this.formGroup.get('operationId')?.value,

    };
    this.defectDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);

    });
  }

  update() {
    let model: UpdateDefect = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      defectCategory: this.formGroup.get('defectCategory')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      operationId: this.formGroup.get('operationId')?.value,
    };
    this.defectDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
