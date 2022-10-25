import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { debounceTime, forkJoin, take } from 'rxjs';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { OperationEditorModel } from '../../../../models/dialog-models/operation-editor-model';
import { AddOperation, OperationModel, ProductModel, SelectModel, UpdateOperation } from '../../../../models/generated';
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
  products!: SelectModel[];
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
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
    let currentProductId = this.operation ? this.operation.productId : 0;
    forkJoin([this.productDataService.get({ id: currentProductId }), this.productDataService.getSelectModel('')]).subscribe(([current, products]) => {
      this.products = products;
      if(current) this.products.splice(1, 0, { id: current.id, code: current.code, name: current.name, translatedName: current.translatedName });
      
      this.formGroup = this.formBuilder.group({
        id: [this.operation && !this.data.isCopy ? this.operation.id : '0', [Validators.required]],
        name: [this.operation ? this.operation.name : '', [Validators.required]],
        code: [this.operation ? this.operation.code : '', [Validators.required]],
        norma: [this.operation ? this.operation.norma : 0],
        operationTime: [this.operation ? this.operation.operationTime : 0],
        translatedName: [this.operation ? this.operation.translatedName : '', [Validators.required]],
        product: [this.operation ? this.products.find(ws => ws.id == this.operation!.productId) : null, [Validators.required]],
      });
      this.filterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filter();
        })
      this.filtered.next(this.products.slice());
    });
  }
  filter(): void {
    if (!this.products) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.products.slice());
      return;
    }
    else search = search.toLowerCase();
    this.productDataService.getSelectModel(search).subscribe((result: any) => {
      this.products = result;
      this.filtered.next(this.products.slice());
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
    
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}



