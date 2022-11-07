import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OperationContext, OperationModel, ProductContext } from '../../../../../models/generated/generated';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-operation-context-editor',
  templateUrl: './operation-context-editor.component.html',
  styleUrls: ['./operation-context-editor.component.scss']
})
export class OperationContextEditorComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked {
  @Input() productContext: ProductContext;
  @Output() refreshProduct = new EventEmitter<ProductContext>();
  formGroup: UntypedFormGroup;
  get itemsFormArray(): FormArray {
    return this.formGroup.get('operations') as FormArray;
  }
  constructor(public languageService: LanguageService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productContext'] && this.productContext) {
      this.formGroup = this.formBuilder.group({
        operations: this.formBuilder.array(new Array<OperationModel>())
      });
      this.formGroup.valueChanges.subscribe(x => {
       
        if (this.itemsFormArray) {
          this.productContext.operations = this.itemsFormArray.value;
          this.refreshProduct.emit(this.productContext);
        } 
      });
      this.productContext?.operations?.forEach(op => this.addOperation(op));
    }
  }
  addOperation(operation: OperationContext | null) {
    const operations = this.itemsFormArray;
    operations.push(this.formBuilder.group({
      id: [operation ? operation.id : 0],
      name: [operation ? operation.name : '', [Validators.required]],
      code: [operation ? operation.code : '', [Validators.required]],
      norma: [operation ? operation.norma : 0],
      operationTime: [operation ? operation.operationTime : 0],
      translatedName: [operation ? operation.translatedName : '', [Validators.required]],

    }));
    
  }
  removeOperation(i: number) {
    const remove = this.formGroup.get('operations') as FormArray;
    remove.removeAt(i);
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
}
