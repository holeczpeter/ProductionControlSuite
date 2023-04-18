import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { WorkshopModel } from '../../../../../models/generated/generated';
import { LanguageService } from '../../../../../services/language/language.service';
import { ProductContextService } from '../../../../../services/productcontext/product-context-.service';

@Component({
  selector: 'app-product-context-editor',
  templateUrl: './product-context-editor.component.html',
  styleUrls: ['./product-context-editor.component.scss']
})
export class ProductContextEditorComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked, OnDestroy {
  workshops: WorkshopModel[];
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<WorkshopModel[]> = new ReplaySubject<WorkshopModel[]>(1);
  protected onDestroy$ = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;

  constructor(public productContextService: ProductContextService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
  }
   
  ngOnInit(): void {
    this.initalize();
  }
  initalize() {
    this.productContextService.getWorkShops().pipe(takeUntil(this.onDestroy$)).subscribe(w => {
      this.workshops = w;
      this.filtered.next(this.workshops.slice());
      this.filterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.filterItems();
        });
    });
  }
  protected setInitialValue() {
    this.filtered
      .pipe(take(1), takeUntil(this.onDestroy$))
      .subscribe(() => {
        if (this.singleSelect) this.singleSelect.compareWith = (a: WorkshopModel, b: WorkshopModel) => a && b && a.id === b.id;
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
  ngAfterViewInit() {
    this.setInitialValue();
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.filtered.next([]);
    this.filtered.complete();
  }
}
