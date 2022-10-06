import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent implements OnInit, OnChanges{

  @Input() title!: string;
  @Output() cancel = new EventEmitter<any>();
  translateTitle!: string;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["title"] && this.title) this.translateTitle = this.title;
  }
  onCancel(): void {
    this.cancel.emit();
  }

}
