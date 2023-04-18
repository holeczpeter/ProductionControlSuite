import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  title = 'FSK';
  supportedLanguages = ['hu', 'de'];
  constructor(private translateService: TranslateService,
    private readonly router: Router) {
    this.translateService.addLangs(this.supportedLanguages);
    this.translateService.currentLang = this.supportedLanguages[0];
    this.translateService.setDefaultLang(this.supportedLanguages[0]);
  }
  ngOnInit(): void {
    
  }
}
