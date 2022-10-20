import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItemModel, MenuTypes } from '../../models/generated';
import { TreeItem } from '../../models/tree-item';
import { AccountService } from '../../services/account.service';
import { NavigationService } from '../../services/navigation/navigation.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  companyName = "Hechinger Hungary Kft.";
  imageSrc = 'assets/images/logo.png';
  name = this.accountService.getUsername();
  currentLang!: string;
  modules!: Array<TreeItem<MenuItemModel>>;
  constructor(public translateService: TranslateService,
    private readonly accountService: AccountService,
    private navigationService: NavigationService) {
    this.translateService.onLangChange.subscribe(x => this.currentLang = x.lang);
    this.navigationService.getMenuItems().subscribe(modules => {
      this.modules = modules.filter(y => y.node.type === MenuTypes.Module);
    });
  }

  ngOnInit(): void {
  }
  setLanguage(key: string, $event:any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.translateService.use(key);
  }
  onLogout() {
    this.accountService.logout();
  }
}
