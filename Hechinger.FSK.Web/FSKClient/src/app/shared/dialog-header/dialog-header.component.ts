import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent implements OnInit {

  @Input() title!: string;
  @Output() cancel = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
