import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit,OnChanges {
  @Input() title!: string;
  translateTitle!: string;
  constructor(public translate: TranslateService) { }
   

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["title"] && this.title) this.translateTitle = this.title;
  }
}
