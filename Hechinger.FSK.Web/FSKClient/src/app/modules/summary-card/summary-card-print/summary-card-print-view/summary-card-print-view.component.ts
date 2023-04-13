import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DefectPrintModel, OperationPrintModel, SelectModel } from '../../../../models/generated/generated';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { LanguageService } from '../../../../services/language/language.service';

@Component({
  selector: 'app-summary-card-print-view',
  templateUrl: './summary-card-print-view.component.html',
  styleUrls: ['./summary-card-print-view.component.scss']
})
export class SummaryCardPrintViewComponent implements OnInit, OnChanges {
  @Input() operation: SelectModel;
  printableOperation: OperationPrintModel;
  @ViewChild('content') content: ElementRef<HTMLElement>;
  code: string;
  numbers: Array<number>;
  count: number;
  currentDate= new Date();
  firstList: DefectPrintModel[];
    secondList: DefectPrintModel[];
  constructor(private readonly operationDataService: OperationDataService,
    public languageService: LanguageService) { }
    

  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['operation'] && this.operation) {
      this.code = this.operation.code;
      this.operationDataService.getPrint({ id: this.operation.id }).subscribe(result => {
        this.printableOperation = result;
        if (this.printableOperation.defects.length <= 10)  this.count = 4;
        if (this.printableOperation.defects.length > 10 && this.printableOperation.defects.length <= 33) this.count = 2;
        if (this.printableOperation.defects.length > 33) {
          this.count = 1;
          this.firstList = this.printableOperation.defects.slice(0, 33);
          this.secondList = this.printableOperation.defects.slice(33, this.printableOperation.defects.length-1);
        } 
        this.numbers = Array(this.count).fill(0).map((x, i) => i);
        
      });
    }
  }
}
