import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItemModel, MenuTypes } from '../../models/generated';
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
  modules!: Array<MenuItemModel>;
  constructor(public translateService: TranslateService, private navigationService: NavigationService) {
    this.translateService.onLangChange.subscribe(x => this.currentLang = x.lang);
    this.navigationService.getMenuItems().subscribe(modules => {
      this.modules = modules.filter(y => y.type === MenuTypes.Module);
      console.log(this.modules)
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
