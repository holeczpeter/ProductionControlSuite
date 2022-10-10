import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUser, RoleModel, UpdateUser, UserModel } from '../../../../models/generated';
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
  constructor(private readonly dialogRef: MatDialogRef<UserEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private readonly userDataService: UserDataService,
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
    });
  }

  ngOnInit(): void {
    this.roleDataService.getAll().subscribe(roles => {
      this.roles = roles;
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
      password: 'valami',
      roleId: this.formGroup.get('roleId')?.value,

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
    };
    this.userDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
