import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { forkJoin, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { ProductEditorModel } from '../../../../models/dialog-models/product-editor-model';
import { AddOperationContext, AddProductContext, DefectModel, GetOperationsByProduct, OperationModel, ProductModel, UpdateOperation, UpdateOperationContext, UpdateProductContext, WorkshopModel } from '../../../../models/generated/generated';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { WorkshopDataService } from '../../../../services/data/workshop-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-product-wizard-editor',
  templateUrl: './product-wizard-editor.component.html',
  styleUrls: ['./product-wizard-editor.component.scss']
})
export class ProductWizardEditorComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  title!: string;
  product: ProductModel | null;
  productId: number;
  formGroup: UntypedFormGroup;
  workshops!: WorkshopModel[];
  operations!: Array<UpdateOperationContext>
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<WorkshopModel[]> = new ReplaySubject<WorkshopModel[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;


  @ViewChild('mystepper') stepper: MatStepper;
  totalStepsCount!: 3;
  operationsIsValid: boolean = true;
  operationId: number;
  get itemsFormArray(): FormArray {
    return this.formGroup.get('operations') as FormArray;
  }
  constructor(private readonly dialogRef: MatDialogRef<ProductWizardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductEditorModel,
    private readonly productDataService: ProductDataService,
    private readonly workshopDataService: WorkshopDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
    this.productId = data ? data.productModel.id : 0;
    this.product = data ? data.productModel : null;
    this.title = this.product ? "products.edit" : "products.add";


  }

  ngOnInit(): void {
    let request: GetOperationsByProduct = {
      productId: this.product ? this.product.id : 0
    }
    forkJoin([this.workshopDataService.getAll()]).
      subscribe(([workshops]) => {
        this.workshops = workshops;
        this.formGroup = this.formBuilder.group({
          id: [this.product && !this.data.isCopy ? this.product.id : '0', [Validators.required]],
          name: [this.product ? this.product.name : '', [Validators.required]],
          code: [this.product ? this.product.code : '', [Validators.required]],
          translatedName: [this.product ? this.product.translatedName : '', [Validators.required]],
          workshop: [this.product ? this.workshops.find(ws => ws.id == this.product!.workshopId) : null, [Validators.required]],
          operations: this.formBuilder.array([]),
        });
        this.filtered.next(this.workshops.slice());
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
        if (this.singleSelect) this.singleSelect.compareWith = (a: WorkshopModel, b: WorkshopModel) => a && b && a.id === b.id;
      });
  }

  protected filterItems() {
    if (!this.workshops) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.workshops.slice());
      return;
    }
    else search = search.toLowerCase();

    this.filtered.next(this.workshops.filter(workshop => workshop.name.toLowerCase().indexOf(search) > -1));
  }
  
  
  
  goBack(stepper: MatStepper) {
    this.stepper.previous();
  }
  goForward(stepper: MatStepper) {
    this.stepper.next();
  }
  onSave() {
    console.log(this.formGroup)
    let model: UpdateProductContext = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      workshopId: this.formGroup.get('workshop')?.value.id,
      operations: this.operations
    };
    this.productDataService.updateContext(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
  ngAfterViewInit() {
    this.setInitialValue();
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}


