import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { LanguageService } from '../../../../../services/language/language.service';
import { ProductContextService } from '../../../../../services/productcontext/product-context-.service';

@Component({
  selector: 'app-defect-context-editor',
  templateUrl: './defect-context-editor.component.html',
  styleUrls: ['./defect-context-editor.component.scss']
})
export class DefectContextEditorComponent implements OnInit, AfterViewInit, AfterContentChecked { 
  constructor(public productContextService: ProductContextService,
    public languageService: LanguageService,
    private readonly changeDetector: ChangeDetectorRef) {
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
