import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { SelectModel } from '../../../../../models/generated/generated';
import { ProductDataService } from '../../../../../services/data/product-data.service';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-defect-group-product-editor',
  templateUrl: './defect-group-product-editor.component.html',
  styleUrls: ['./defect-group-product-editor.component.scss']
})
export class DefectGroupProductEditorComponent implements OnInit {

  formGroup!: UntypedFormGroup;
  protected products: SelectModel[];

  public productFilterCtrl: FormControl = new FormControl();
  public filteredBanksMulti: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);

  @ViewChild('multiSelect') multiSelect: SelectModel;
  protected _onDestroy = new Subject<void>();


  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly productDataService: ProductDataService,
    public languageService: LanguageService) { }

  ngOnInit() {
    this.productDataService.getByFilter('').subscribe(products => {
      this.products = products;
      this.formGroup = this.formBuilder.group({
        product: [null, [Validators.required]],
      });
      this.formGroup.valueChanges.subscribe(x => console.log(x));
      this.productFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filterProductsMulti();
        })
      this.filteredBanksMulti.next(this.products.slice());
    });
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
      this.filteredBanksMulti.next(this.products.slice());
      return;
    } else {
      search = search.toLowerCase();
      this.productDataService.getByFilter(search).subscribe((result: any) => {
        this.products = result;
        this.filteredBanksMulti.next(
          this.products.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
        );
      });
    }
  }
}
