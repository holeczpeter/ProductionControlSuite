import { OnDestroy } from '@angular/core';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { ProductModel, SelectModel } from '../../models/generated/generated';
import { ProductDataService } from '../../services/data/product-data.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit, OnDestroy {

  @Output() select = new EventEmitter<ProductModel>();
  formGroup!: UntypedFormGroup;
  products!: SelectModel[];
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  @ViewChild('productSelect') productSelect: MatSelect;
  operations!: SelectModel[];
  protected _onDestroy = new Subject<void>();

  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly productDataService: ProductDataService,
    public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.productDataService.getByFilter('').pipe(takeUntil(this._onDestroy)).subscribe(products => {
      this.products = products;
      this.formGroup = this.formBuilder.group({
        product: [null, [Validators.required]],
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
      this.select.emit(x);
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

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.filteredProducts.next([]);
    this.filteredProducts.complete();
  }

}
