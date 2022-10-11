import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  
  title = 'FSKClient';
  supportedLanguages = ['hu', 'de'];
  constructor(private translateServeice: TranslateService,
    private readonly router: Router ) {
    router.events.subscribe(x => {
      console.log(x)
    });
    translateServeice.addLangs(this.supportedLanguages);
    translateServeice.setDefaultLang(this.supportedLanguages[1]);
  }
}
