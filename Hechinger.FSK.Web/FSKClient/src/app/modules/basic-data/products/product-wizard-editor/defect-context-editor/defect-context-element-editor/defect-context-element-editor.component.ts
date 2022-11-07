import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DefectContext, EnumModel, OperationContext } from '../../../../../../models/generated/generated';
import { DefectDataService } from '../../../../../../services/data/defect-data.service';
import { LanguageService } from '../../../../../../services/language/language.service';

@Component({
  selector: 'app-defect-context-element-editor',
  templateUrl: './defect-context-element-editor.component.html',
  styleUrls: ['./defect-context-element-editor.component.scss']
})
export class DefectContextElementEditorComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterContentChecked {

  @Input() operation: OperationContext;
  @Input() categories: EnumModel[];
  @Output() resfreshOperation = new EventEmitter<OperationContext>();
  formGroup: UntypedFormGroup;
  private _differ: IterableDiffer<any>;
  get itemsFormArray(): FormArray {
    return this.formGroup.get('defects') as FormArray;
  }
  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private differs: IterableDiffers,
    public languageService: LanguageService) {
    this._differ = this.differs.find([]).create();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['operation'] && this.operation) {
      this.initalize();
    }
  }
  initalize(){
    this.formGroup = this.formBuilder.group({
      defects: this.formBuilder.array(new Array<DefectContext>())
    });
    this.formGroup.valueChanges.subscribe(x => {
      if (this.itemsFormArray) {
        this.operation.defects = this.itemsFormArray.value;
        this.resfreshOperation.emit(this.operation);
      }
    });
    this.operation?.defects?.forEach(defect => this.addDefect(defect));
  }
  ngDoCheck() {
    var changes = this._differ.diff(this.categories);
    
   
  }

  addDefect(defect: DefectContext | null) {
    const defects = this.itemsFormArray;
    defects.push(this.formBuilder.group({
      id: [defect ? defect.id : 0, [Validators.required]],
      name: [defect ? defect.name : '', [Validators.required]],
      code: [defect ? defect.code : '', [Validators.required]],
      translatedName: [defect ? defect.translatedName : '', [Validators.required]],
      defectCategory: [defect ? defect.defectCategory : '', [Validators.required]],
    }));
  }

  removeDefect(i: number) {
    const remove = this.formGroup.get('defects') as FormArray;
    remove.removeAt(i);
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
}

