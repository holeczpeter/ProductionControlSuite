import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-initial-avatar',
  templateUrl: './initial-avatar.component.html',
  styleUrls: ['./initial-avatar.component.scss']
})
export class InitialAvatarComponent implements OnInit {
  hu: string;
  de: string;
  constructor(private accountService: AccountService, public languageService: LanguageService) {
  }

  ngOnInit(): void {
    let first = this.accountService.getUsername().charAt(0);
    let index = this.accountService.getUsername().indexOf(" ");
    let second = this.accountService.getUsername().charAt(index + 1);
    this.hu = first + second;
    this.de = second + first;
  }

}
