import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { OperationModel, OperationPrintModel } from '../../../../models/generated/generated';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { LanguageService } from '../../../../services/language/language.service';

@Component({
  selector: 'app-summary-card-print-view',
  templateUrl: './summary-card-print-view.component.html',
  styleUrls: ['./summary-card-print-view.component.scss']
})
export class SummaryCardPrintViewComponent implements OnInit, OnChanges {
  @Input() operation: OperationModel;
  printableOperation: OperationPrintModel;
  @ViewChild('content') content: ElementRef<HTMLElement>;
  constructor(private readonly operationDataService: OperationDataService,
    public languageService: LanguageService) { }
    

  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['operation'] && this.operation) {
      this.operationDataService.getPrint({ id: this.operation.id }).subscribe(result => {
        this.printableOperation = result;
      });
    }
  }
}
