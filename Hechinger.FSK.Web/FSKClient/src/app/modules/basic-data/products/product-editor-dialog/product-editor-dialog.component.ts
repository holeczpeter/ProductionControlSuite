import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductEditorModel } from '../../../../models/dialog-models/product-editor-model';
import { AddProduct, ProductModel, UpdateProduct, WorkshopModel } from '../../../../models/generated';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { WorkshopDataService } from '../../../../services/data/workshop-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-product-editor-dialog',
  templateUrl: './product-editor-dialog.component.html',
  styleUrls: ['./product-editor-dialog.component.scss']
})
export class ProductEditorDialogComponent implements OnInit {
  title!: string;
  product: ProductModel | null;
  formGroup: UntypedFormGroup;
  workshops!: WorkshopModel[];
  constructor(private readonly dialogRef: MatDialogRef<ProductEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductEditorModel,
    private readonly productDataService: ProductDataService,
    private readonly workshopDataService: WorkshopDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
    this.product = data ? data.productModel: null;
    this.title = this.product ? "products.edit" :"products.add";
    this.formGroup = this.formBuilder.group({
      id: [this.product && !data.isCopy ? this.product.id : '0', [Validators.required]],
      name: [this.product ? this.product.name : '', [Validators.required]],
      code: [this.product ? this.product.code : '', [Validators.required]],
      translatedName: [this.product ? this.product.translatedName : '', [Validators.required]],
      workshopId: [this.product ? this.product.workshopId : '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.workshopDataService.getAll().subscribe(workshops => {
      this.workshops = workshops;
    });
  }

  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddProduct = {
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      workshopId: this.formGroup.get('workshopId')?.value,

    };
    this.productDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);

    });
  }

  update() {
    let model: UpdateProduct = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      workshopId: this.formGroup.get('workshopId')?.value,
    };
    this.productDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

