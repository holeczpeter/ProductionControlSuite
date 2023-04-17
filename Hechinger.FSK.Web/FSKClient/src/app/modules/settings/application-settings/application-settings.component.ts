import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { HasComponentUnsavedChanges } from '../../../guards/auth.guard';
import { GetUser, GetUserSettings, LanguageModel } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { LanguageDataService } from '../../../services/data/language-data.service';
import { UserDataService } from '../../../services/data/user-data.service';
import { UserSettingsService } from '../../../services/data/user-settings.service';
import { LanguageService } from '../../../services/language/language.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss']
})
export class ApplicationSettingsComponent implements OnInit, HasComponentUnsavedChanges, OnDestroy {
  languages!: LanguageModel[];
  formGroup!: UntypedFormGroup;
  title = "applicationsettings";
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  imageSrcMale = 'assets/images/avatar_male.png';
  imageSrcFemale = 'assets/images/avatar_female.png';
  imageSrcDefault = 'assets/images/avatar_default.png';
  destroy$: Subject<any> = new Subject();

  constructor(private readonly userSettingsService: UserSettingsService,
    private readonly accountService: AccountService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    public languageService: LanguageService,
    private readonly languageDataService: LanguageDataService) { }

  ngOnInit(): void {
    let request: GetUserSettings = { id: this.accountService.getUserId() };
    forkJoin([this.userSettingsService.getUserSettings(request), this.languageDataService.getAll()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([user, languages]) => {
      this.languages = languages;
      this.formGroup = this.formBuilder.group({
        id: [user.id, [Validators.required]],
        languageId: [user.languageId, [Validators.required]],
        pageSize: [user.pageSize, [Validators.required]],
        avatarType: [user.avatarType, Validators.required]
      }).setOriginalForm();
    });
   
  }
  onSave() {
    let updateUserSettings = this.formGroup.getRawValue();
    this.userSettingsService.updateUserSettings(updateUserSettings).subscribe(result => {
      this.snackBar.open(result);
      
      if (result.isSuccess) {
        this.accountService.setPageSize(updateUserSettings.pageSize);
        this.accountService.setAvatar(updateUserSettings.avatarType);
        this.ngOnInit();
      } 
    });
  }
  hasUnsavedChanges(): boolean {
    return this.formGroup.isChanged();
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
