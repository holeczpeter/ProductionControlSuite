import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { debounceTime, forkJoin, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { DefectEditorModel } from '../../../../models/dialog-models/defect-editor-model';
import { AddDefect, DefectModel, EnumModel, SelectModel, UpdateDefect } from '../../../../models/generated/generated';
import { ConfirmDialogService } from '../../../../services/confirm-dialog/confirm-dialog-service';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-defect-editor-dialog',
  templateUrl: './defect-editor-dialog.component.html',
  styleUrls: ['./defect-editor-dialog.component.scss']
})
export class DefectEditorDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  title!: string;
  defect!: DefectModel | null;
  formGroup: UntypedFormGroup;
  operations!: SelectModel[];
  categories!: EnumModel[];
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;
  constructor(private readonly dialogRef: MatDialogRef<DefectEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DefectEditorModel,
    private readonly defectDataService: DefectDataService,
    private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    private readonly confirmDialogService: ConfirmDialogService,
    public languageService: LanguageService) {
    this.defect = data ? data.defectModel : null;
    this.title = this.defect ? this.data.isCopy ? "defects.copy" : "defects.edit" :  "defects.add";

  }

  ngOnInit(): void {
    let currentOperationId = this.defect ? this.defect.operationId : 0;
    forkJoin([this.operationDataService.get({ id: currentOperationId }),
    this.operationDataService.getByFilter(''),
    this.defectDataService.getAllDefectCategories()]).subscribe(([current, operations, categories]) => {
      this.operations = operations;
      if (current) this.operations.splice(1, 0, { id: current.id, code: current.code, name: current.name, translatedName: current.translatedName });
      this.categories = categories;
      this.formGroup = this.formBuilder.group({
        id: [this.defect && !this.data.isCopy ? this.defect.id : '0', [Validators.required]],
        name: [this.defect ? this.defect.name : '', [Validators.required]],
        code: [this.defect ? this.defect.code : '', [Validators.required]],
        order: [this.defect ? this.defect.order : 0, [Validators.required, Validators.min(1)]],
        translatedName: [this.defect ? this.defect.translatedName : '', [Validators.required]],
        defectCategory: [this.defect ? this.defect.defectCategory : '', [Validators.required]],
        operation: [this.defect ? this.operations.find(ws => ws.id == this.defect!.operationId) : null, [Validators.required]],
      }).setOriginalForm();
      this.filterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filter();
        });
      this.filtered.next(this.operations.slice());
      this.filtered.next(this.operations.slice());


    })
  }
  filter(): void {
    if (!this.operations) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.operations.slice());
      return;
    }
    else search = search.toLowerCase();
    this.operationDataService.getByFilter(search).subscribe((result: any) => {
      this.operations = result;
      this.filtered.next(this.operations.slice());
    });
  }
  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    if (this.data && this.data.defectModel && this.data?.defectModel.code == this.formGroup.get('code')?.value && this.data.isCopy) {
      this.confirmDialogService.openError("fehler.existingCode").subscribe(x => {
        return;
      });
    }
    else {
      let model: AddDefect = {
        name: this.formGroup.get('name')?.value,
        code: this.formGroup.get('code')?.value,
        defectCategory: this.formGroup.get('defectCategory')?.value,
        translatedName: this.formGroup.get('translatedName')?.value,
        operationId: this.formGroup.get('operation')?.value.id,
        order: this.formGroup.get('order')?.value.id,
      };
      this.defectDataService.add(model).subscribe(result => {
        this.snackBar.open(result);
        if (result.isSuccess) this.dialogRef.close(true);

      });
    }
  
  }

  update() {
    let model: UpdateDefect = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      code: this.formGroup.get('code')?.value,
      defectCategory: this.formGroup.get('defectCategory')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      operationId: this.formGroup.get('operation')?.value.id,
      order: this.formGroup.get('order')?.value.id,
    };
    this.defectDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    if (this.formGroup.isChanged()) this.confirmDialogService.confirmClose(this.dialogRef);
    else this.dialogRef.close(false);
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
