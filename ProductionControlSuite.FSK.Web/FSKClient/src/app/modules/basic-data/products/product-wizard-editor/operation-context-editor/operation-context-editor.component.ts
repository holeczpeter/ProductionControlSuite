import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../../services/language/language.service';
import { ProductContextService } from '../../../../../services/productcontext/product-context-.service';

@Component({
  selector: 'app-operation-context-editor',
  templateUrl: './operation-context-editor.component.html',
  styleUrls: ['./operation-context-editor.component.scss']
})
export class OperationContextEditorComponent implements OnInit, AfterViewInit, AfterContentChecked {

  constructor(public languageService: LanguageService,
    private readonly changeDetector: ChangeDetectorRef,
    public productContextService: ProductContextService) {
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
}
