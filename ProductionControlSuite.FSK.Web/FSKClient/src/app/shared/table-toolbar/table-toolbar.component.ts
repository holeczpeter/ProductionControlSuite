import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent implements OnInit {
  
  @Output() btnClick = new EventEmitter();
  constructor() {

  }

  ngOnInit(): void {

  }
  onClick(event: MouseEvent) {
   this.btnClick.emit();
  }
}

