import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { map, Observable, ReplaySubject, startWith, Subject, take, takeUntil } from 'rxjs';
import { ProductEditorModel } from '../../../../models/dialog-models/product-editor-model';
import { AddProduct, ProductModel, UpdateProduct, WorkshopModel } from '../../../../models/generated';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { WorkshopDataService } from '../../../../services/data/workshop-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-product-editor-dialog',
  templateUrl: './product-editor-dialog.component.html',
  styleUrls: ['./product-editor-dialog.component.scss']
})
export class ProductEditorDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  title!: string;
  product: ProductModel | null;
  formGroup: UntypedFormGroup;
  workshops!: WorkshopModel[];
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<WorkshopModel[]> = new ReplaySubject<WorkshopModel[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;
  constructor(private readonly dialogRef: MatDialogRef<ProductEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductEditorModel,
    private readonly productDataService: ProductDataService,
    private readonly workshopDataService: WorkshopDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    public languageService: LanguageService) {
    this.product = data ? data.productModel: null;
    this.title = this.product ? "products.edit" :"products.add";
   
    
  }

  ngOnInit(): void {
    
    this.workshopDataService.getAll().subscribe(workshops => {
      this.workshops = workshops;
      let currentWorkShop = this.workshops.find(ws => ws.id == this.product!.workshopId);
      this.formGroup = this.formBuilder.group({
        id: [this.product && !this.data.isCopy ? this.product.id : '0', [Validators.required]],
        name: [this.product ? this.product.name : '', [Validators.required]],
        code: [this.product ? this.product.code : '', [Validators.required]],
        translatedName: [this.product ? this.product.translatedName : '', [Validators.required]],
        workshop: [this.product ? currentWorkShop : null, [Validators.required]],
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
        if (this.singleSelect)this.singleSelect.compareWith = (a: WorkshopModel, b: WorkshopModel) => a && b && a.id === b.id;
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
  onSave() {
    console.log(this.formGroup)
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddProduct = {
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      workshopId: this.formGroup.get('workshop')?.value.id
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
      workshopId: this.formGroup.get('workshop')?.value.id,
    };
    this.productDataService.update(model).subscribe(result => {
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


