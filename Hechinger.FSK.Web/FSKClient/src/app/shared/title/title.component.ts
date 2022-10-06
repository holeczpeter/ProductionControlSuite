import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() title!: string;
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
