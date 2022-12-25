import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { ProductModel, SelectModel } from '../../models/generated/generated';
import { ProductDataService } from '../../services/data/product-data.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-product-multi-select-search',
  templateUrl: './product-multi-select-search.component.html',
  styleUrls: ['./product-multi-select-search.component.scss']
})
export class ProductMultiSelectSearchComponent implements OnInit, OnChanges {
  @Input() productIds: Array<number> = new Array<number>();
  @Output() select = new EventEmitter<Array<ProductModel>>();
  formGroup!: UntypedFormGroup;
  protected products: SelectModel[];

  public productFilterCtrl: FormControl = new FormControl();
  public filteredProductsMulti: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);

  @ViewChild('multiSelect') multiSelect: SelectModel;
  protected _onDestroy = new Subject<void>();


  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly productDataService: ProductDataService,
    public languageService: LanguageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productIds'] && this.productIds) this.initalize();
  }
  initalize() {
    this.productDataService.getByFilter('').subscribe(products => {
      this.products = products;
      let currentSelection = this.products.filter(x => this.productIds.includes(x.id));
      this.formGroup = this.formBuilder.group({
        product: [currentSelection && currentSelection.length > 0 ? currentSelection: null, [Validators.required]],
      });
      this.formGroup.valueChanges.subscribe(x => {
        this.select.emit(x.product)
      });
      this.productFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filterProductsMulti();
        })
      this.filteredProductsMulti.next(this.products.slice());
    });
  }
  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }



  protected filterProductsMulti() {
    if (!this.products) {
      return;
    }
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProductsMulti.next(this.products.slice());
      return;
    } else {
      search = search.toLowerCase();
      this.productDataService.getByFilter(search).subscribe((result: any) => {
        this.products = result;
        this.filteredProductsMulti.next(
          this.products.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
        );
      });
    }
  }
}
