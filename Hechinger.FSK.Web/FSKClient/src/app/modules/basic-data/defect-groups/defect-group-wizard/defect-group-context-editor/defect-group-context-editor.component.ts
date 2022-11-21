import { ChangeDetectorRef, DoCheck } from '@angular/core';
import { Component, Input, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductModel } from '../../../../../models/generated/generated';
import { ProductDataService } from '../../../../../services/data/product-data.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { ProductContextService } from '../../../../../services/productcontext/product-context-.service';
import { SnackbarService } from '../../../../../services/snackbar/snackbar.service';



@Component({
  selector: 'app-defect-group-context-editor',
  templateUrl: './defect-group-context-editor.component.html',
  styleUrls: ['./defect-group-context-editor.component.scss']
})
export class DefectGroupContextEditorComponent implements OnInit, DoCheck {
  @Input() products: Array<ProductModel>
  private _differ: IterableDiffer<any>;
  constructor(private differs: IterableDiffers,
    private readonly productDataService: ProductDataService,
    public productContextService: ProductContextService,
    private readonly snackBar: SnackbarService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
    this._differ = this.differs.find([]).create(this.trackByFn);
  }
  ngDoCheck(): void {
    const changes = this._differ.diff(this.products);
    if (changes) {
      
    }
  }
  ngOnInit(): void {
  }
  getContext() {
    //forkJoin([this.productDataService.getProductContext(productRequest)]).subscribe(([product]) => {
    //  this.product = product;
    //  this.productContextService.buildForm(this.product);
    //});
  }
  trackByFn(index: number, item: any) {
    return index;
  }
}
