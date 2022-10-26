import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItemModel, MenuTypes } from '../../models/generated/generated';
import { TreeItem } from '../../models/tree-item';
import { AccountService } from '../../services/account.service';
import { LanguageService } from '../../services/language/language.service';
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
 
  modules!: Array<TreeItem<MenuItemModel>>;
  constructor(public languageService: LanguageService,
    private readonly accountService: AccountService,
    private navigationService: NavigationService) {
    this.navigationService.getMenuItems().subscribe(modules => {
      this.modules = modules.filter(y => y.node.type === MenuTypes.Module);
    });
  }

  ngOnInit(): void {
  }
  setLanguage(key: string, $event:any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.languageService.setLang(key);
  }
  onLogout() {
    this.accountService.logout();
  }
}
