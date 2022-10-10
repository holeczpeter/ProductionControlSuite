import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, map, Observable, startWith } from 'rxjs';
import { AddRole, GetRole, GetUserExceptRole, RoleDetailModel, RoleModel, RoleUserItem, UpdateRole, UserModel } from '../../../../models/generated';
import { RoleDataService } from '../../../../services/data/role-data.service';
import { UserDataService } from '../../../../services/data/user-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-role-editor-dialog',
  templateUrl: './role-editor-dialog.component.html',
  styleUrls: ['./role-editor-dialog.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false },
  },]
})
export class RoleEditorDialogComponent implements OnInit {
  title!: string;
  role!: RoleDetailModel;

  dataSource!: MatTableDataSource<AbstractControl>;
  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: Array<string> = ['fullName', 'code', 'delete']

  filteredUsers!: Observable<RoleUserItem[]>;
  allUsers!: Array<RoleUserItem>;
  userInputCtrl = new UntypedFormControl();
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

  formGroup!: UntypedFormGroup;
  get users(): FormArray<AbstractControl<RoleUserItem>> {
    return this.formGroup.get('users') as FormArray<AbstractControl<RoleUserItem>>;
  }

  constructor(private readonly dialogRef: MatDialogRef<RoleEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleModel,
    private readonly userDataService: UserDataService,
    private readonly roleDataService: RoleDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
    this.title = this.data ? "roles.edit" : "roles.add";

  }

  ngOnInit(): void {
    let id = this.data ? this.data.id : 0;
    let getRole: GetRole = { id: id };
    let getUserExceptRole: GetUserExceptRole = { roleId: id };
    forkJoin([this.roleDataService.get(getRole), this.userDataService.getExceptRole(getUserExceptRole)]).subscribe(([role, users]) => {
      this.role = role;
      this.allUsers = users; 
      this.formGroup = this.formBuilder.group({
        id: [this.role ? this.role.id : '0', [Validators.required]],
        name: [this.role ? this.role.name : '', [Validators.required]],
        translatedName: [this.role ? this.role.translatedName : '', [Validators.required]],
        code: [this.role ? this.role.code : '', [Validators.required]],
        isDefault: [this.role ? this.role.isDefault : false],
        users: this.formBuilder.array(new Array<RoleUserItem>())
      });
      this.dataSource = new MatTableDataSource<AbstractControl>();
      this.users.valueChanges.subscribe(x => {
        this.dataSource.data = this.users.controls;
      });
      if(this.role) this.role.users.forEach((d: RoleUserItem) => this.addRow(d));

      this.filteredUsers = this.userInputCtrl.valueChanges.pipe(
        startWith(''),
        map(value => {
          if (typeof value === 'string') return this.allUsers.filter(x => x.fullName.toLowerCase().includes(value.toLowerCase()) || x.code.toLowerCase().includes(value.toLowerCase()))
          else return this.allUsers
        }));
    });
  }

  addRow(userRoleItem: RoleUserItem) {
    const row = this.formBuilder.group({
      'id': [userRoleItem.id],
      'code': [userRoleItem.code],
      'fullName': [userRoleItem.fullName],
    });
    this.users.push(row);
    this.removeFromAllUser(userRoleItem);
  }

  removeRow(element: RoleUserItem) {
    let index = this.users.value.findIndex((user: any) => user.id === element.id);
    this.users.removeAt(index);
    this.removeFromAllUser(element);
  }

  addToAllUser(element: RoleUserItem) {
    this.allUsers.push(element);
  }

  removeFromAllUser(element: RoleUserItem) {
    let currentUser = this.allUsers.find(user => user.id == element.id);
    if (currentUser) {
      let index = this.allUsers.indexOf(currentUser);
      if (index > -1) this.allUsers.splice(index, 1);
    }
  }

  onUserSelect(event: MatAutocompleteSelectedEvent): void {
    this.userNameInput.nativeElement.value = '';
    let currentUser = this.allUsers.find(x => x.id == event.option.value.id);
    if (currentUser) this.addRow(currentUser);
  }

  onUserRemove(element: RoleUserItem): void {
    this.removeRow(element);
  }

  trackByIdFn(option: number) {
    return option;
  }

  onSave() {
    this.formGroup.get('id')?.value == 0 ? this.add() : this.update();
  }

  add() {
    let model: AddRole = {
      code: this.formGroup.get('code')?.value,
      name: this.formGroup.get('name')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      isDefault: this.formGroup.get('isDefault')?.value,
    };
    this.roleDataService.add(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  update() {
    let model: UpdateRole = {
      id: this.formGroup.get('id')?.value,
      code: this.formGroup.get('code')?.value,
      name: this.formGroup.get('name')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      isDefault: this.formGroup.get('isDefault')?.value,
    };
    this.roleDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
