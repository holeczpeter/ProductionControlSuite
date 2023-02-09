import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationInfo, MenuItemModel, MenuTypes } from '../../models/generated/generated';
import { TreeItem } from '../../models/tree-item';
import { AccountService } from '../../services/account.service';
import { ApplicationService } from '../../services/data/application.service';
import { LanguageService } from '../../services/language/language.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { HelpCenterComponent } from '../../shared/help-center/help-center.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'rotate(-180deg)'
      })),
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  companyName = "Hechinger Hungary Kft.";
  imageSrc = 'assets/images/logo.png';
  name = this.accountService.getUsername();
  code = this.accountService.getCode();
  panelOpenState = false;
  modules!: Array<TreeItem<MenuItemModel>>;
  applicationInformation: ApplicationInfo;
  personalSettingsModule: TreeItem<MenuItemModel>[];
  constructor(public languageService: LanguageService,
    private readonly accountService: AccountService,
    private readonly applicationService: ApplicationService,
    private readonly dialog: MatDialog,
    private navigationService: NavigationService) {
    this.navigationService.getMenuItems().subscribe(modules => {
      this.modules = modules.filter(y => y.node.type === MenuTypes.Module);
      this.personalSettingsModule = this.modules.flatMap(x => x.children).filter(i => i.node.path.includes('/settings'))
     
    });
  }


  ngOnInit(): void {
    this.applicationService.get().subscribe(appInfo => {
      this.applicationInformation = appInfo;
    });
  }
  setLanguage(key: string, $event:any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.languageService.setLang(key);
  }
  settingsOpened() {
    this.panelOpenState = true;
  }
  settingsClosed() {
    this.panelOpenState = false;
  }
  onSupport() {
    let dialogRef = this.dialog.open(HelpCenterComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe();
  }
  onLogout() {
    this.accountService.logout();
  }
}
