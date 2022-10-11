import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { AddUser, LanguageModel, RoleModel, UpdateUser, UserModel } from '../../../../models/generated';
import { LanguageDataService } from '../../../../services/data/language-data.service';
import { RoleDataService } from '../../../../services/data/role-data.service';
import { UserDataService } from '../../../../services/data/user-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-user-editor-dialog',
  templateUrl: './user-editor-dialog.component.html',
  styleUrls: ['./user-editor-dialog.component.scss']
})
export class UserEditorDialogComponent implements OnInit {
  title!: string;
  formGroup: UntypedFormGroup;
  roles!: RoleModel[];
  languages!: LanguageModel[];
  constructor(private readonly dialogRef: MatDialogRef<UserEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private readonly userDataService: UserDataService,
    private readonly languageDataService: LanguageDataService,
    private readonly roleDataService: RoleDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
    this.title = this.data ? "users.edit" : "users.add";
    this.formGroup = this.formBuilder.group({
      id: [this.data ? this.data.id : '0', [Validators.required]],
      firstName: [this.data ? this.data.firstName : '', [Validators.required]],
      lastName: [this.data ? this.data.lastName : '', [Validators.required]],
      code: [this.data ? this.data.code : '', [Validators.required]],
      roleId: [this.data ? this.data.roleId : '', [Validators.required]],
      password: [null],
      languageId: [this.data ? this.data.languageId : '', [Validators.required]],
    });
    if (this.formGroup && this.data) {
      this.formGroup.get('password')!.clearValidators() 
    }
    else if (this.formGroup && this.data == null) {
      this.formGroup.get('password')!.setValidators(Validators.required);
    }
    this.formGroup.valueChanges.subscribe(x => { console.log(x) })
  }

  ngOnInit(): void {
    forkJoin([this.roleDataService.getAll(), this.languageDataService.getAll()]).subscribe(([roles, languages]) => {
      this.roles = roles;
      this.languages = languages;
    });
    
  }

  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddUser = {
      id: this.formGroup.get('id')?.value,
      code: this.formGroup.get('code')?.value,
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      password: this.formGroup.get('password')?.value,
      roleId: this.formGroup.get('roleId')?.value,
      languageId: this.formGroup.get('languageId')?.value,

    };
    this.userDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);

    });
  }

  update() {
    let model: UpdateUser = {
      id: this.formGroup.get('id')?.value,
      code: this.formGroup.get('code')?.value,
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      password: this.formGroup.get('password')?.value,
      roleId: this.formGroup.get('roleId')?.value,
      languageId: this.formGroup.get('languageId')?.value
    };
    console.log(model)
    this.userDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
