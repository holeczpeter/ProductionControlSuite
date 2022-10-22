import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { forkJoin, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { DefectEditorModel } from '../../../../models/dialog-models/defect-editor-model';
import { OperationEditorModel } from '../../../../models/dialog-models/operation-editor-model';
import { AddDefect, AddOperation, DefectModel, EnumModel, OperationModel, ProductModel, UpdateDefect, UpdateOperation } from '../../../../models/generated';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-defect-editor-dialog',
  templateUrl: './defect-editor-dialog.component.html',
  styleUrls: ['./defect-editor-dialog.component.scss']
})
export class DefectEditorDialogComponent implements OnInit, AfterViewInit, OnDestroy{
  title!: string;
  defect!: DefectModel | null;
  formGroup: UntypedFormGroup;
  operations!: OperationModel[];
  categories!: EnumModel[];
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<OperationModel[]> = new ReplaySubject<OperationModel[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;
  constructor(private readonly dialogRef: MatDialogRef<DefectEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DefectEditorModel,
    private readonly defectDataService: DefectDataService,
    private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    public languageService: LanguageService) {
    this.defect = data ? data.defectModel : null;
    this.title = this.defect ? "defects.edit" : "defects.add";
    
  }

  ngOnInit(): void {
    forkJoin([this.operationDataService.getAll(), this.defectDataService.getAllDefectCategories()]).subscribe(([operations, categories]) => {
      this.operations = operations;
      this.categories = categories;
      this.formGroup = this.formBuilder.group({
        id: [this.defect && !this.data.isCopy ? this.defect.id : '0', [Validators.required]],
        name: [this.defect ? this.defect.name : '', [Validators.required]],
        code: [this.defect ? this.defect.code : '', [Validators.required]],
        translatedName: [this.defect ? this.defect.translatedName : '', [Validators.required]],
        defectCategory: [this.defect ? this.defect.defectCategory : '', [Validators.required]],
        operation: [this.defect ? this.operations.find(ws => ws.id == this.defect!.operationId) : null, [Validators.required]],
      });

      this.filtered.next(this.operations.slice());

      this.filterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterItems();
        });
    })
  }
  protected setInitialValue() {
    this.filtered
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.singleSelect) this.singleSelect.compareWith = (a: ProductModel, b: ProductModel) => a && b && a.id === b.id;
      });
  }

  protected filterItems() {
    if (!this.operations) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.operations.slice());
      return;
    }
    else search = search.toLowerCase();
    this.filtered.next(this.operations.filter(operation => operation.name.toLowerCase().indexOf(search) > -1));
  }
  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddDefect = {
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      defectCategory: this.formGroup.get('defectCategory')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      operationId: this.formGroup.get('operation')?.value.id,

    };
    this.defectDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);

    });
  }

  update() {
    let model: UpdateDefect = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      defectCategory: this.formGroup.get('defectCategory')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      operationId: this.formGroup.get('operation')?.value.id,
    };
    this.defectDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
