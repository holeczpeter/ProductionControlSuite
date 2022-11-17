import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { GetDefectsByOperation, GetOperationsByProduct, GetWorkerStatisticsByDefect, SelectModel, WorkerStatisticsModel } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { QualityDataService } from '../../../services/data/quality-data.service';
import { LanguageService } from '../../../services/language/language.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-worker-compare-statistics',
  templateUrl: './worker-compare-statistics.component.html',
  styleUrls: ['./worker-compare-statistics.component.scss']
})
export class WorkerCompareStatisticsComponent implements OnInit, OnDestroy {
  
  title = "workercompare.title";
  formGroup: UntypedFormGroup;
  products!: SelectModel[];
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  @ViewChild('productSelect') productSelect: MatSelect;

  operations!: SelectModel[];
  defects!: SelectModel[];
  protected _onDestroy = new Subject<void>();

  model: WorkerStatisticsModel;
  
  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly qualityDataService: QualityDataService,
    private readonly productDataService: ProductDataService,
    private readonly operatonDataService: OperationDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService) { }

  ngOnInit(): void {
    this.productDataService.getByFilter('').subscribe(products => {
      this.products = products;
      this.formGroup = this.formBuilder.group({
        startDate: [new Date(new Date().getFullYear(),0,1), [Validators.required]],
        endDate: [new Date(), [Validators.required]],
        product: [null, [Validators.required]],
        operation: [null, [Validators.required]],
        defect: [null, [Validators.required]],
      });
      this.valueChanges();
      this.productFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filterProduct();
        })
      this.filteredProducts.next(this.products.slice());
    });
  }
  valueChanges() {
    this.formGroup.get('product')?.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(x => {
      this.getOperationsByProduct();
    });
    this.formGroup.get('operation')?.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(x => {
      this.getDefectsByOperation();
    });
  }
  getDefectsByOperation() {
    let request: GetDefectsByOperation = { operationId: this.formGroup.get('operation')?.value.id };
    this.defectDataService.getByOperation(request).subscribe(defects => {
      this.defects = defects;
    });

  }
  getOperationsByProduct() {
    let request: GetOperationsByProduct = { productId: this.formGroup.get('product')?.value.id };
    this.operatonDataService.getByProduct(request).subscribe(operations => {
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
    this.productDataService.getByFilter(search).subscribe((result: any) => {
      this.products = result;
      this.filteredProducts.next(this.products.slice());
    });
  }

 
  onRequest() {
    let request: GetWorkerStatisticsByDefect = {
      defectId: this.formGroup.get('defect')?.value.id,
      startDate: new Date(this.formGroup.get('startDate')?.value),
      endDate: new Date(this.formGroup.get('endDate')?.value),
    };
    this.qualityDataService.getWorkerStatisticsByDefect(request).subscribe(result => {
      this.model = result;
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
