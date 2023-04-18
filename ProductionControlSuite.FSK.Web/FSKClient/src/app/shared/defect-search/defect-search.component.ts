import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { GetDefectsByOperation, GetOperationsByProduct, SelectModel } from '../../models/generated/generated';
import { DefectDataService } from '../../services/data/defect-data.service';
import { OperationDataService } from '../../services/data/operation-data.service';
import { ProductDataService } from '../../services/data/product-data.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-defect-search',
  templateUrl: './defect-search.component.html',
  styleUrls: ['./defect-search.component.scss']
})
export class DefectSearchComponent implements OnInit, OnDestroy {
  @Output() select = new EventEmitter<SelectModel>();
  formGroup: UntypedFormGroup;
  products!: SelectModel[];
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  @ViewChild('productSelect') productSelect: MatSelect;
  operations!: SelectModel[];
  defects!: SelectModel[];
  protected _onDestroy$ = new Subject<void>();

  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly productDataService: ProductDataService,
    private readonly operatonDataService: OperationDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService,) { }

  ngOnInit(): void {
    this.productDataService.getByFilter('').pipe(takeUntil(this._onDestroy$)).subscribe(products => {
      this.products = products;
      this.formGroup = this.formBuilder.group({
        product: [null, [Validators.required]],
        operation: [null, [Validators.required]],
        defect: [null, [Validators.required]],
      });
      this.valueChanges();
      this.productFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy$)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filterProduct();
        })
      this.filteredProducts.next(this.products.slice());
    });
  }
  valueChanges() {
    this.formGroup.get('product')?.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(x => {
      this.getOperationsByProduct();
    });
    this.formGroup.get('operation')?.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(x => {
      this.getDefectsByOperation();
    });
    this.formGroup.get('defect')?.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(x => {
      this.select.emit(x);
    });
  }
  getDefectsByOperation() {
    let request: GetDefectsByOperation = { operationId: this.formGroup.get('operation')?.value.id };
    this.defectDataService.getByOperation(request).pipe(takeUntil(this._onDestroy$)).subscribe(defects => {
      this.defects = defects;
    });

  }
  getOperationsByProduct() {
    let request: GetOperationsByProduct = { productId: this.formGroup.get('product')?.value.id };
    this.operatonDataService.getByProduct(request).pipe(takeUntil(this._onDestroy$)).subscribe(operations => {
      this.operations = operations;
    });
  }

  filterProduct(): void {
    if (!this.products) return;
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.products.slice());
      return;
    }
    else search = search.toLowerCase();
    this.productDataService.getByFilter(search).pipe(takeUntil(this._onDestroy$)).subscribe((result: any) => {
      this.products = result;
      this.filteredProducts.next(this.products.slice());
    });
  }
  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this.filteredProducts.next([]);
    this.filteredProducts.complete();
  }
}
