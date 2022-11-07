import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { EnumModel, OperationContext, ProductContext } from '../../../../../models/generated/generated';
import { DefectDataService } from '../../../../../services/data/defect-data.service';

@Component({
  selector: 'app-defect-context-editor',
  templateUrl: './defect-context-editor.component.html',
  styleUrls: ['./defect-context-editor.component.scss']
})
export class DefectContextEditorComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked{
  @Input() productContext: ProductContext;
  @Input() categories: EnumModel[];
  @Output() refreshProduct = new EventEmitter<ProductContext>();
  formGroup: UntypedFormGroup;
 
  constructor(
    private readonly changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productContext'] && this.productContext) {
      
    }
  }

  initalize() {
    
  }
  refreshOperation(event: OperationContext) {
    let current = this.productContext.operations.find(x => x.id == event.id);
    if (current) {
      current = event;
      this.refreshProduct.emit(this.productContext);
    }
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
}
