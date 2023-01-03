import { ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import JSBarCode from "jsbarcode";
@Component({
  selector: 'app-summary-card-header',
  templateUrl: './summary-card-header.component.html',
  styleUrls: ['./summary-card-header.component.scss']
})
export class SummaryCardHeaderComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() code: string;
  @ViewChild('barcode') barcode: ElementRef;
 
  constructor() { }
   
  

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] && this.code && this.barcode) {
      this.generate();
    }
  }
  generate() {
    if (this.barcode) {
      JSBarCode(this.barcode.nativeElement, this.code, {
        format: 'CODE128',
      });
    }
  }
  ngAfterViewInit(): void {
    this.generate();
  }
}
