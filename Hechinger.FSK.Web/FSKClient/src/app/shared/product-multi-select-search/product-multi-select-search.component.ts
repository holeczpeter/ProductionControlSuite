import { Component, DoCheck, EventEmitter, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
export class ProductMultiSelectSearchComponent implements OnInit, DoCheck {
  @Input() productIds: Array<number>;
  @Output() select = new EventEmitter<Array<ProductModel>>();
  formGroup!: UntypedFormGroup;
  protected products: ProductModel[];

  public productFilterCtrl: FormControl = new FormControl();
  public filteredProductsMulti: ReplaySubject<ProductModel[]> = new ReplaySubject<ProductModel[]>(1);

  @ViewChild('multiSelect') multiSelect: ProductModel;
  protected _onDestroy = new Subject<void>();
  private _differ: IterableDiffer<any>;

  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly productDataService: ProductDataService,
    private differs: IterableDiffers,
    public languageService: LanguageService) {
    this._differ = this.differs.find([]).create();
  }
  ngDoCheck() {
    
    var changes = this._differ.diff(this.productIds);
    
    if (changes) {
      
    }
  }
  
  initalize() {
    this.productDataService.getAll().subscribe(products => {
     
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
    this.initalize();
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
