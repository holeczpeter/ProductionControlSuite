import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { GetUsersByRole, GetUsersExceptByRole, RoleUserItem } from '../../../../models/generated/generated';
import { AccountService } from '../../../../services/account.service';
import { RoleDataService } from '../../../../services/data/role-data.service';


@Component({
  selector: 'app-role-user-editor',
  templateUrl: './role-user-editor.component.html',
  styleUrls: ['./role-user-editor.component.scss']
})
export class RoleUserEditorComponent implements OnInit, OnChanges, OnDestroy{
  @Input() roleId!: number;
  @Output() resfresh = new EventEmitter<Array<RoleUserItem>>();
  dataSource!: MatTableDataSource<AbstractControl>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: Array<string> = ['fullName', 'code', 'delete']
  filteredUsers!: Observable<RoleUserItem[]>;
  allUsers!: Array<RoleUserItem>;
  userInputCtrl = new UntypedFormControl();
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;
  formGroup!: UntypedFormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  get users(): FormArray<AbstractControl<RoleUserItem>> {
    return this.formGroup.get('users') as FormArray<AbstractControl<RoleUserItem>>;
  }

  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly roleDataService: RoleDataService,
    private readonly accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes["roleId"]) {
      let getUserByRole: GetUsersByRole = { roleId: this.roleId };
      let getUserExceptRole: GetUsersExceptByRole = { roleId: this.roleId };
      forkJoin([this.roleDataService.getUsersByRole(getUserByRole), this.roleDataService.getUsersExceptByRole(getUserExceptRole)]).pipe(takeUntil(this.destroy$)).subscribe(([usersByRole, users]) => {
        this.allUsers = users;
        this.formGroup = this.formBuilder.group({
          users: this.formBuilder.array(new Array<RoleUserItem>())
        });
        this.dataSource = new MatTableDataSource<AbstractControl>();
        this.users.valueChanges.subscribe(x => {
          this.dataSource.data = this.users.controls;
          this.resfresh.emit(this.users.value);
        });
        usersByRole.forEach((d: RoleUserItem) => this.addRow(d));

        this.filteredUsers = this.userInputCtrl.valueChanges.pipe(
          startWith(''),
          map(value => {
            if (typeof value === 'string') return this.allUsers.filter(x => x.fullName.toLowerCase().includes(value.toLowerCase()) || x.code.toLowerCase().includes(value.toLowerCase()))
            else return this.allUsers
          }));
      });
    }
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
