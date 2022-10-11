import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuItemModel } from './models/generated';
import { TreeItem } from './models/tree-item';
import { NavigationService } from './services/navigation/navigation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
