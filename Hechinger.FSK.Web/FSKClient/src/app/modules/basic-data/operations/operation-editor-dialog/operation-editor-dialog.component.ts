import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperationEditorModel } from '../../../../models/dialog-models/operation-editor-model';
import { AddOperation, OperationModel, ProductModel, UpdateOperation } from '../../../../models/generated';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-operation-editor-dialog',
  templateUrl: './operation-editor-dialog.component.html',
  styleUrls: ['./operation-editor-dialog.component.scss']
})
export class OperationEditorDialogComponent implements  OnInit {
  title!: string;
  operation!: OperationModel | null;
  formGroup: UntypedFormGroup;
  products!: ProductModel[];
  constructor(private readonly dialogRef: MatDialogRef<OperationEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OperationEditorModel,
    private readonly productDataService: ProductDataService,
    private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
    this.operation = data ? data.operationModel : null;
    this.title = this.operation ? "products.edit" : "products.add";
    this.formGroup = this.formBuilder.group({
      id: [this.operation && !data.isCopy ? this.operation.id : '0', [Validators.required]],
      name: [this.operation ? this.operation.name : '', [Validators.required]],
      code: [this.operation ? this.operation.code : '', [Validators.required]],
      norma: [this.operation ? this.operation.norma : 0],
      operationTime: [this.operation ? this.operation.operationTime : 0],
      translatedName: [this.operation ? this.operation.translatedName : '', [Validators.required]],
      productId: [this.operation ? this.operation.productId : '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.productDataService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddOperation = {
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      norma: this.formGroup.get('norma')?.value,
      operationTime: this.formGroup.get('operationTime')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      productId: this.formGroup.get('productId')?.value,

    };
    this.operationDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);

    });
  }

  update() {
    let model: UpdateOperation = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      norma: this.formGroup.get('norma')?.value,
      operationTime: this.formGroup.get('operationTime')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      productId: this.formGroup.get('productId')?.value,
    };
    this.operationDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}



