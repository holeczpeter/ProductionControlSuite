import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  
  name = this.accountService.getUsername();
  code = this.accountService.getCode();
  lang = this.accountService.getLanguage() == "hu" ? "Magyar" : "Deutsch";
  roleName = this.accountService.getRoleName();
  roleTranslatedName = this.accountService.getRoleTranslatedName();
  imageSrc = "";
  avatarType: number;
  constructor(private accountService: AccountService, public languageService: LanguageService) {
    this.accountService.getavatar().subscribe(avatar => {
      this.avatarType = avatar;
      switch (avatar) {
        case 0: 
          return;
        case 1: this.imageSrc = 'assets/images/avatar_male.png';
          return;
        case 2: this.imageSrc = 'assets/images/avatar_female.png';
          return;
        default:
          return;
      }

    });
  }

  ngOnInit(): void {
  }

}
