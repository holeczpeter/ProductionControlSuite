import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { take } from 'rxjs';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { OperationEditorModel } from '../../../../models/dialog-models/operation-editor-model';
import { AddOperation, OperationModel, ProductModel, UpdateOperation } from '../../../../models/generated';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-operation-editor-dialog',
  templateUrl: './operation-editor-dialog.component.html',
  styleUrls: ['./operation-editor-dialog.component.scss']
})
export class OperationEditorDialogComponent implements OnInit, AfterViewInit, OnDestroy  {
  title!: string;
  operation!: OperationModel | null;
  formGroup: UntypedFormGroup;
  products!: ProductModel[];
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<ProductModel[]> = new ReplaySubject<ProductModel[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;
  constructor(private readonly dialogRef: MatDialogRef<OperationEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OperationEditorModel,
    private readonly productDataService: ProductDataService,
    private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    public languageService: LanguageService ) {
    this.operation = data ? data.operationModel : null;
    this.title = this.operation ? "products.edit" : "products.add";
    
  }

  ngOnInit(): void {
    this.productDataService.getAll().subscribe(products => {
      this.products = products;
      this.formGroup = this.formBuilder.group({
        id: [this.operation && !this.data.isCopy ? this.operation.id : '0', [Validators.required]],
        name: [this.operation ? this.operation.name : '', [Validators.required]],
        code: [this.operation ? this.operation.code : '', [Validators.required]],
        norma: [this.operation ? this.operation.norma : 0],
        operationTime: [this.operation ? this.operation.operationTime : 0],
        translatedName: [this.operation ? this.operation.translatedName : '', [Validators.required]],
        product: [this.operation ? this.products.find(ws => ws.id == this.operation!.productId) : null, [Validators.required]],
      });
      this.filtered.next(this.products.slice());

      this.filterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterItems();
        });

    });
  }
  protected setInitialValue() {
    this.filtered
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.singleSelect) this.singleSelect.compareWith = (a: ProductModel, b: ProductModel) => a && b && a.id === b.id;
      });
  }

  protected filterItems() {
    if (!this.products) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.products.slice());
      return;
    }
    else search = search.toLowerCase();
    this.filtered.next(this.products.filter(product => product.name.toLowerCase().indexOf(search) > -1));
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
      productId: this.formGroup.get('product')?.value.id,

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
      productId: this.formGroup.get('product')?.value.id,
    };
    this.operationDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}



