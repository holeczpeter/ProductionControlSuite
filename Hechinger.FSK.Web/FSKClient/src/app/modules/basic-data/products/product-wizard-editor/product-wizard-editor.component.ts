import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { forkJoin, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { ProductEditorModel } from '../../../../models/dialog-models/product-editor-model';
import { AddProduct, DefectModel, GetOperationsByProduct, OperationModel, ProductModel, SaveDefectContext, SaveOperationContext, UpdateDefect, UpdateOperation, UpdateProduct, WorkshopModel } from '../../../../models/generated/generated';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { OperationDataService } from '../../../../services/data/operation-data.service';
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
  operations!: Array<OperationModel>;
  defects!: Array<DefectModel>;
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<WorkshopModel[]> = new ReplaySubject<WorkshopModel[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('mystepper') stepper: MatStepper;
  totalStepsCount!: 3;
  operationsIsValid: boolean = false;
  defectsIsValid: boolean;
  
  constructor(private readonly dialogRef: MatDialogRef<ProductWizardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductEditorModel,
    private readonly productDataService: ProductDataService,
    private readonly operationDataService: OperationDataService,
    private readonly defectDataService: DefectDataService,
    private readonly workshopDataService: WorkshopDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
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
  goForwardAndSaveProduct(stepper: MatStepper) {
    this.formGroup.get('id')?.value == 0 ? this.addProduct(stepper) : this.updateProduct(stepper);
  }
  goForwardAndSaveOperations(stepper: MatStepper) {
    let items = new Array<UpdateOperation>();
    this.operations.forEach(op => {
      let oepration: UpdateOperation = {
        id: op.id,
        code: op.code,
        name: op.name,
        norma: op.norma,
        operationTime: op.operationTime,
        productId: op.productId,
        translatedName: op.translatedName
      }
      items.push(oepration);
    });
    let request: SaveOperationContext = {
      operations : items,
    }
    this.operationDataService.saveContext(request).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) {
        this.goForward(stepper);
      }
    });
  }
  goForwardAndSaveDefects(stepper: MatStepper) {
    let items = new Array<UpdateDefect>();
    this.defects.forEach(d => {
      let defect: UpdateDefect = {
        id: d.id,
        code: d.code,
        name: d.name,
        operationId: d.operationId,
        translatedName: d.translatedName,
        defectCategory: d.defectCategory
      }
      items.push(defect);
    });
    let request: SaveDefectContext = {
      defects: items,
    }
    this.defectDataService.saveContext(request).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) {
        this.goForward(stepper);
      }
    });
  }
  addProduct(stepper: MatStepper) {
    let model: AddProduct = {
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      workshopId: this.formGroup.get('workshop')?.value.id,

    };
    this.productDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) {
        this.productId = result.entities;
        this.goForward(stepper);
      } 
    });
  }

  updateProduct(stepper: MatStepper) {
    let model: UpdateProduct = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      workshopId: this.formGroup.get('workshop')?.value.id,

    };
    this.productDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) {
        this.productId = result.entities;
        this.goForward(stepper);
      }
    });
  }
  refreshOperations(event: Array<OperationModel>) {
    this.operations = event;
  }
  refreshOperationsValid(event: boolean) {
    this.operationsIsValid = event;
  }
  //refreshDefects(event: Array<DefectModel>) {
  //  this.defects = event;
  //}
  //refreshDefectsValid(event: boolean) {
  //  this.defectsIsValid = event;
  //}
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


