import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GetOperationsByProduct, OperationModel, UpdateOperationContext } from '../../models/generated/generated';
import { OperationDataService } from '../../services/data/operation-data.service';
import { ProductDataService } from '../../services/data/product-data.service';
import { WorkshopDataService } from '../../services/data/workshop-data.service';
import { LanguageService } from '../../services/language/language.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-operation-list-editor',
  templateUrl: './operation-list-editor.component.html',
  styleUrls: ['./operation-list-editor.component.scss']
})
export class OperationListEditorComponent implements OnInit, OnChanges {
  @Input() formGroup: UntypedFormGroup;
  @Output() resfresh = new EventEmitter<Array<UpdateOperationContext>>();
  @Output() isValid = new EventEmitter<boolean>();
  
  get itemsFormArray(): FormArray {
    return this.formGroup.get('operations') as FormArray;
  }
  constructor(private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    public languageService: LanguageService) { }
  

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      let request: GetOperationsByProduct = {
        productId: this.formGroup.get('id')?.value,
      }
      forkJoin([this.operationDataService.getByProduct(request)]).
        subscribe(([operations]) => {
          operations.forEach(op => this.addOperation(op));
        });
    }
  }
  addOperation(operation: OperationModel | null) {
    const operations = this.formGroup.get('operations') as FormArray;
    operations.push(this.formBuilder.group({
      id: [operation ? operation.id : 0],
      name: [operation ? operation.name : '', [Validators.required]],
      code: [operation ? operation.code : '', [Validators.required]],
      norma: [operation ? operation.norma : 0],
      operationTime: [operation ? operation.operationTime : 0],
      translatedName: [operation ? operation.translatedName : '', [Validators.required]],
      hasDefect: [operation ? operation.hasDefect : false],
      defects: this.formBuilder.array([]),
    }));
  }
  removeOperation(i: number) {
    const remove = this.formGroup.get('operations') as FormArray;
    remove.removeAt(i);
  }
}
