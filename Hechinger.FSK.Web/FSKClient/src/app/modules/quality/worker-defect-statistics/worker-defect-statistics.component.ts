import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, forkJoin, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { DefectStatisticModel, GetDefectsByOperation, GetDefectStatisticsByUser, GetOperationsByProduct, SelectModel, WorkerModel, WorkerStatisticsModel } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { QualityDataService } from '../../../services/data/quality-data.service';
import { WorkerDataService } from '../../../services/data/worker-data.service';
import { LanguageService } from '../../../services/language/language.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-worker-defect-statistics',
  templateUrl: './worker-defect-statistics.component.html',
  styleUrls: ['./worker-defect-statistics.component.scss']
})

export class WorkerDefectStatisticsComponent implements OnInit, OnDestroy {
  formGroup: UntypedFormGroup;
  title = "defectcompare.title";
  chartInfo: any;
  products!: SelectModel[];
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  @ViewChild('productSelect') productSelect: MatSelect;
  operations!: SelectModel[];
  defects!: SelectModel[];
  protected _onDestroy = new Subject<void>();
  public workerFilterCtrl: FormControl = new FormControl();
  public filteredWorkers: ReplaySubject<WorkerModel[]> = new ReplaySubject<WorkerModel[]>(1);
  @ViewChild('workerSelect') workerSelect: MatSelect;
  workers: WorkerModel[];
  model: DefectStatisticModel;

  constructor(private readonly workerDataService: WorkerDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly qualityDataService: QualityDataService,
    private readonly productDataService: ProductDataService,
    private readonly operatonDataService: OperationDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService) {
  }

  ngOnInit(): void {
    forkJoin([this.workerDataService.getAll(), this.productDataService.getByFilter('')])
      .pipe(takeUntil(this._onDestroy))
      .subscribe(([workers, products]) => {
        this.products = products;
        this.workers = workers;
        this.formGroup = this.formBuilder.group({
          startDate: [new Date(new Date().getFullYear(), 0, 1), [Validators.required]],
          endDate: [new Date(), [Validators.required]],
          product: [null, [Validators.required]],
          operation: [null, [Validators.required]],
          worker: [null, [Validators.required]],
        });
        this.valueChanges();
        this.productFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
          debounceTime(500)).subscribe(filter => {
            this.filterProduct();
          })
        this.filteredProducts.next(this.products.slice());
        this.workerFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
          debounceTime(500)).subscribe(filter => {
            this.filterWorker();
          })
        this.filteredWorkers.next(this.workers.slice());
      });
  }

  valueChanges() {
    this.formGroup.get('product')?.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(x => {
      this.getOperations();
    });
    this.formGroup.get('operation')?.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(x => {
      this.getDefects();
    });
  }
  getDefects() {
    let request: GetDefectsByOperation = { operationId: this.formGroup.get('operation')?.value.id };
    this.defectDataService.getByOperation(request).pipe(takeUntil(this._onDestroy)).subscribe(defects => {
      this.defects = defects;
    });
  }

  getOperations() {
    let request: GetOperationsByProduct = { productId: this.formGroup.get('product')?.value.id };
    this.operatonDataService.getByProduct(request).pipe(takeUntil(this._onDestroy)).subscribe(operations => {
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
    this.productDataService.getByFilter(search).pipe(takeUntil(this._onDestroy)).subscribe((result: any) => {
      this.products = result;
      this.filteredProducts.next(this.products.slice());
    });
  }

  filterWorker(): void {
    if (!this.workers) return;
    let search = this.workerFilterCtrl.value;
    if (!search) {
      this.filteredWorkers.next(this.workers.slice());
      return;
    }
    else search = search.toLowerCase();
    this.workerDataService.getByFilter(search).pipe(takeUntil(this._onDestroy)).subscribe((result: any) => {
      this.workers = result;
      this.filteredWorkers.next(this.workers.slice());
    });
  }

  onRequest() {
    let request: GetDefectStatisticsByUser = {
      workerCode: this.formGroup.get('worker')?.value.workerCode,
      startDate: new Date(this.formGroup.get('startDate')?.value),
      endDate: new Date(this.formGroup.get('endDate')?.value),
      operationId: this.formGroup.get('operation')?.value.id,
    };
    this.qualityDataService.getDefectStatisticsByUser(request).subscribe(results => {
      this.model = results;
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.filteredProducts.next([]);
    this.filteredProducts.complete();
    this.filteredWorkers.next([]);
    this.filteredWorkers.complete();
  }

}
