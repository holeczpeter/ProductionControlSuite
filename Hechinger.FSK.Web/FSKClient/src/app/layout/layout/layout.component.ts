import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuItemModel } from '../../models/generated/generated';
import { SpinnerData } from '../../models/spinner-data';
import { TreeItem } from '../../models/tree-item';
import { NavigationService } from '../../services/navigation/navigation.service';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy {
  loaderData: SpinnerData = {
    type: 'ProgressBar',
    title: 'loading'
  };
 
  supportedLanguages = ['hu', 'de'];
  onDestroy$ = new Subject();
  openedSidebar = true;
  sidebarMenuItems!: Array<TreeItem<MenuItemModel>>;

  constructor(private router: Router,
    private readonly navigationService: NavigationService,
   
    public spinnerService: SpinnerService) {
  
    this.router.events.pipe(takeUntil(this.onDestroy$)).subscribe((x) => {
     
      if (x instanceof NavigationEnd) {
        this.navigationService.getMenuItems().subscribe(menuitems => {
          if (menuitems) {
            let currentModule = menuitems.find(menu => menu.node.path === `/${this.navigationService.moduleNameFromUrl(x.url)}`);
            if (currentModule) this.sidebarMenuItems = currentModule!.children;
          }
        });
      }
    });
  }

  onToggleSidebar() {
    this.openedSidebar = !this.openedSidebar;

  }
  onScroll() {
  }
  ngOnDestroy() {
    this.onDestroy$.next(null);
  }
}
