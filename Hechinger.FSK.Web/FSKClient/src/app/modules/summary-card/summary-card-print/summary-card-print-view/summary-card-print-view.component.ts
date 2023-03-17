import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { OperationPrintModel, SelectModel } from '../../../../models/generated/generated';
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
  numbers: Array<number>
  constructor(private readonly operationDataService: OperationDataService,
    public languageService: LanguageService) { }
    

  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['operation'] && this.operation) {
      this.code = this.operation.code;
      this.operationDataService.getPrint({ id: this.operation.id }).subscribe(result => {
        this.printableOperation = result;
        if (this.printableOperation.defects.length <= 7) this.numbers = Array(4).fill(0).map((x, i) => i);
        if (this.printableOperation.defects.length > 7 && this.printableOperation.defects.length <= 33) this.numbers = Array(2).fill(0).map((x, i) => i);
        if (this.printableOperation.defects.length > 33) this.numbers = Array(1).fill(0).map((x, i) => i);
        console.log(this.numbers)
      });
    }
  }
}
