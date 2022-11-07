import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { forkJoin, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { OperationContext, ProductContext, WorkshopModel } from '../../../../../models/generated/generated';
import { DefectDataService } from '../../../../../services/data/defect-data.service';
import { WorkshopDataService } from '../../../../../services/data/workshop-data.service';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-product-context-editor',
  templateUrl: './product-context-editor.component.html',
  styleUrls: ['./product-context-editor.component.scss']
})
export class ProductContextEditorComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy, AfterContentChecked{
  @Input() productContext: ProductContext;
  @Input() workshops: WorkshopModel[];
  @Output() refreshProduct = new EventEmitter<ProductContext>();
  formGroup: UntypedFormGroup;
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<WorkshopModel[]> = new ReplaySubject<WorkshopModel[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;
  constructor(private readonly workshopDataService: WorkshopDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService) { }
   

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productContext'])
      this.initalize();
     
    
  }
  initalize() {
    if (this.workshops) {
      this.formGroup = this.formBuilder.group({
        id: [this.productContext ? this.productContext.id : '0', [Validators.required]],
        name: [this.productContext ? this.productContext.name : '', [Validators.required]],
        code: [this.productContext ? this.productContext.code : '', [Validators.required]],
        translatedName: [this.productContext ? this.productContext.translatedName : '', [Validators.required]],
        workshop: [this.productContext ? this.workshops.find(ws => ws.id == this.productContext!.workshopId) : null, [Validators.required]],

      });
      this.formGroup.valueChanges.subscribe(x => {

        let productContext: ProductContext = {
          id: x.id,
          code: x.code,
          name: x.name,
          translatedName: x.translatedName,
          workshopId: x.workshop ? x.workshop.id : 0,
          operations: new Array<OperationContext>()
        }
        this.refreshProduct.emit(productContext);
      });
      this.filtered.next(this.workshops.slice());
      this.filterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterItems();
        });
    }
    
  }
  protected setInitialValue() {
    this.filtered
      .pipe(take(1), takeUntil(this._onDestroy))
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
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
