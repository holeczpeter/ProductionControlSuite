import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  
  title = 'FSK';
  supportedLanguages = ['hu', 'de'];
  constructor(private translateService: TranslateService,
    private readonly router: Router ) {
    
    translateService.addLangs(this.supportedLanguages);
    translateService.setDefaultLang(this.supportedLanguages[0]);
  }
}
