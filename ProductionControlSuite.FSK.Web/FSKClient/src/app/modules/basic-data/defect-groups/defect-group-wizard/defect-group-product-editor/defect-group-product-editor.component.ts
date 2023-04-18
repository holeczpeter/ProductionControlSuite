import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { EntityGroupRelationModel } from '../../../../../models/generated/generated';
import { EntityGroupDataService } from '../../../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-defect-group-product-editor',
  templateUrl: './defect-group-product-editor.component.html',
  styleUrls: ['./defect-group-product-editor.component.scss']
})
export class DefectGroupProductEditorComponent implements OnInit, OnChanges, AfterViewInit {
  
  protected products: EntityGroupRelationModel[];
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProductsMulti: ReplaySubject<EntityGroupRelationModel[]> = new ReplaySubject<EntityGroupRelationModel[]>(1);
  @ViewChild('multiSelect') multiSelect: MatSelect;
  selectedUsers: EntityGroupRelationModel[] = new Array<EntityGroupRelationModel>();
  protected onDestroy$ = new Subject<void>();

  constructor(public languageService: LanguageService,
    public entityGroupDataService: EntityGroupDataService,
    public entityGroupService: EntityGroupService) { }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit() {
    if (this.entityGroupService.treeForm) {
      let params = new HttpParams();
      params = params.append('groupId', this.entityGroupService.treeForm.get('node')?.value.id);
      params = params.append('filter', '');
      this.entityGroupDataService.getProductsForRelation(params).subscribe(products => {
        this.products = products;
        this.productFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy$)).pipe(
          debounceTime(500)).subscribe(filter => {
            this.filterProductsMulti();
          })
        this.filteredProductsMulti.next(this.products.slice());
      });
    }
  }
  
  trackById(index: any, item: EntityGroupRelationModel): number {
    return item.entityId;
  }
  protected setInitialValue() {
    this.filteredProductsMulti
      .pipe(take(1), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.multiSelect.compareWith = (a: EntityGroupRelationModel, b: EntityGroupRelationModel) => a && b && a.entityId === b.entityId;
      });
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
      let params = new HttpParams();
      params = params.append('groupId', this.entityGroupService.treeForm.get('node')?.value.id);
      params = params.append('filter', search);
      this.entityGroupDataService.getProductsForRelation(params).pipe(takeUntil(this.onDestroy$)).subscribe((result: any) => {
        this.filteredProductsMulti.next(this.products.filter(product => (product.name && product.name.toLowerCase().indexOf(search) > -1) ||
          (product.code && product.code.toLowerCase().indexOf(search) > -1)));
      });
    }
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

