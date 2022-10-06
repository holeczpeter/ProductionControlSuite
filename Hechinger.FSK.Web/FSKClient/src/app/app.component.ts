import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuItemModel } from './models/generated';
import { NavigationService } from './services/navigation/navigation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  open = false;
  title = 'FSKClient';
  supportedLanguages = ['hu', 'de'];
  onDestroy$ = new Subject();
  openedSidebar = true;
  sidebarMenuItems!: Array<MenuItemModel>;

  constructor(private translateServeice: TranslateService, private router: Router, private readonly navigationService: NavigationService) {
    translateServeice.addLangs(this.supportedLanguages);
    translateServeice.setDefaultLang(this.supportedLanguages[1]);
    this.router.events.pipe(takeUntil(this.onDestroy$)).subscribe((x) => {
      if (x instanceof NavigationEnd) {
        this.navigationService!.getMenuItems().subscribe(menuitems => {
          if (menuitems) {
            let currentModule = menuitems.find(menu => menu.path === `/${this.navigationService.moduleNameFromUrl(x.url)}`);
            this.sidebarMenuItems = currentModule!.children;
          }
        });
      }});
  }

  onToggleSidebar() {
    this.openedSidebar = !this.openedSidebar;
    
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
  }
}
