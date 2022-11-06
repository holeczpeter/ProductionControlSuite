import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GetOperationsByProduct, OperationModel } from '../../models/generated/generated';
import { OperationDataService } from '../../services/data/operation-data.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-operation-list-editor',
  templateUrl: './operation-list-editor.component.html',
  styleUrls: ['./operation-list-editor.component.scss']
})
export class OperationListEditorComponent implements OnInit, OnChanges {
  @Input() productId: number;
  @Output() resfreshItems = new EventEmitter<Array<OperationModel>>();
  @Output() isValid = new EventEmitter<boolean>();
  formGroup: UntypedFormGroup;

  get itemsFormArray(): FormArray {
    return this.formGroup.get('operations') as FormArray;
  }
  constructor(private readonly operationDataService: OperationDataService,
    private readonly formBuilder: UntypedFormBuilder,
    public languageService: LanguageService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && this.productId) {
      let request: GetOperationsByProduct = {
        productId: this.productId,
      }
      this.formGroup = this.formBuilder.group({
        operations: this.formBuilder.array(new Array<OperationModel>())
      });
      this.formGroup.valueChanges.subscribe(x => {
        this.resfreshItems.emit(this.itemsFormArray.value);
        this.isValid.emit(this.formGroup.valid);
      });
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
      productId: [this.productId,[Validators.required]],
      hasDefect: [operation ? operation.hasDefect : false],
     
    }));
  }
  removeOperation(i: number) {
    const remove = this.formGroup.get('operations') as FormArray;
    remove.removeAt(i);
  }
}
