import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { SelectModel, WorkshopModel } from '../../models/generated/generated';
import { WorkshopDataService } from '../../services/data/workshop-data.service';
import { LanguageService } from '../../services/language/language.service';
@Component({
  selector: 'app-workshop-search',
  templateUrl: './workshop-search.component.html',
  styleUrls: ['./workshop-search.component.scss']
})
export class WorkshopSearchComponent implements OnInit, OnDestroy {

  @Output() select = new EventEmitter<SelectModel>();
  formGroup!: UntypedFormGroup;
  workshops!: SelectModel[];
  public workshopFilterCtrl: FormControl = new FormControl();
  public filteredWorkshops: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  @ViewChild('workshopSelect') workshopSelect: MatSelect;
  operations!: SelectModel[];
  protected _onDestroy = new Subject<void>();

  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly workshopDataService: WorkshopDataService,
    public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.workshopDataService.getByFilter('').pipe(takeUntil(this._onDestroy)).subscribe(workshops => {
      this.workshops = workshops;
      this.formGroup = this.formBuilder.group({
        workshop: [null, [Validators.required]],
      });
      this.valueChanges();
      this.workshopFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filter();
        })
      this.filteredWorkshops.next(this.workshops.slice());
    });
  }

  valueChanges() {
    this.formGroup.get('workshop')?.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(x => {
      this.select.emit(x);
    });
  }

  filter(): void {
    if (!this.workshops) return;
    let search = this.workshopFilterCtrl.value;
    if (!search) {
      this.filteredWorkshops.next(this.workshops.slice());
      return;
    }
    else search = search.toLowerCase();
    this.workshopDataService.getByFilter(search).pipe(takeUntil(this._onDestroy)).subscribe((result: any) => {
      this.workshops = result;
      this.filteredWorkshops.next(this.workshops.slice());
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.filteredWorkshops.next([]);
    this.filteredWorkshops.complete();
  }

}

