import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements  OnInit {

  @Input() text: string;
  @Input() contentTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
