import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { SummaryModel } from '../../models/generated/generated';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit, OnChanges{
  @Input() summary: SummaryModel;
  title: string;
  icon: string;
  subtitle: string;
  value: string;
  color: string;
  constructor() { }
    

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['summary'] && this.summary) {
      this.icon = this.summary.icon;
      this.title = this.summary.title;
      this.subtitle = this.summary.subtitle;
      this.value = this.summary.value;
      this.color = this.summary.color;
    }
  }
  getColor() {
    return {
      'color': this.color,
    }
  }
}
