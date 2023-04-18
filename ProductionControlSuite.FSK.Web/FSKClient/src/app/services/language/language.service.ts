import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private subject = new BehaviorSubject<string | undefined>(this.translateService.getDefaultLang());
  public getCurrentLanguage() {
    return this.subject.asObservable();
  }
  setLang(key: string) {
    this.translateService.use(key);
  }
  constructor(public translateService: TranslateService) {
    this.translateService.onLangChange.subscribe(x => {
      this.subject.next(x.lang)
    });
  }
}
