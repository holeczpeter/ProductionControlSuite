import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AddDefect, DefectModel, EnumModel, GetDefectsByOperation, UpdateDefect, UpdateOperation, UpdateOperationContext } from '../../models/generated/generated';
import { DefectDataService } from '../../services/data/defect-data.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-defect-list-editor',
  templateUrl: './defect-list-editor.component.html',
  styleUrls: ['./defect-list-editor.component.scss']
})
export class DefectListEditorComponent  {

  //@Input() formGroup: AbstractControl;
  //@Output() resfresh = new EventEmitter<Array<DefectModel>>();
  //@Output() isValid = new EventEmitter<boolean>();

  //categories!: EnumModel[];
  //get itemsFormArray(): FormArray {
  //  return this.formGroup.get('defects') as FormArray;
  //}
  //constructor(private readonly defectDataService: DefectDataService,
  //  private readonly formBuilder: UntypedFormBuilder,
  //  private readonly changeDetector: ChangeDetectorRef,
  //  public languageService: LanguageService) { }


  //ngOnInit(): void {
  //}
  //ngOnChanges(changes: SimpleChanges): void {
  //  if (changes['formGroup'] && this.formGroup) {
  //    let request: GetDefectsByOperation = {
  //      operationId: this.formGroup.get('id')?.value,
  //    }
  //    forkJoin([this.defectDataService.getByOperation(request), this.defectDataService.getAllDefectCategories()]).
  //      subscribe(([defects, categories]) => {
  //        this.categories = categories;
          
  //        defects.forEach(defect => this.addDefect(defect));
  //      });
  //  }
  //}
  //addDefect(defect: UpdateDefect | null) {
  //  const defects = this.formGroup.get('items') as FormArray;
  //  defects.push(this.formBuilder.group({
  //    id: [defect ? defect.id : 0, [Validators.required]],
  //    name: [defect ? defect.name : '', [Validators.required]],
  //    code: [defect ? defect.code : '', [Validators.required]],
  //    translatedName: [defect ? defect.translatedName : '', [Validators.required]],
  //    defectCategory: [defect ? defect.defectCategory : '', [Validators.required]],
      
  //  }));
  //}
  //removeDefect(i: number) {
  //  const remove = this.formGroup.get('items') as FormArray;
  //  remove.removeAt(i);
  //}
}
