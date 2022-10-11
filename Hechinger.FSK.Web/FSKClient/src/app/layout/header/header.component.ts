import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItemModel, MenuTypes } from '../../models/generated';
import { TreeItem } from '../../models/tree-item';
import { NavigationService } from '../../services/navigation/navigation.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  companyName = "Hechinger Hungary Kft.";
  imageSrc = 'assets/images/logo.png';
  name = 'Holecz Péter';
  currentLang!: string;
  modules!: Array<TreeItem<MenuItemModel>>;
  constructor(public translateService: TranslateService, private navigationService: NavigationService) {
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
}
