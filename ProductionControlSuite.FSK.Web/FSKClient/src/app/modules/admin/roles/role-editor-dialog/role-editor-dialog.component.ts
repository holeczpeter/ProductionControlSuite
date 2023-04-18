import { SelectionModel } from '@angular/cdk/collections';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, forkJoin, Subject, takeUntil } from 'rxjs';
import { AddRole, GetRole, RoleDetailModel, RoleMenuItem, RoleModel, RoleUserItem, UpdateRole } from '../../../../models/generated/generated';
import { TreeItemFlatNode } from '../../../../models/tree-item-flat-node';
import { ConfirmDialogService } from '../../../../services/confirm-dialog/confirm-dialog-service';
import { RoleDataService } from '../../../../services/data/role-data.service';
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
export class RoleEditorDialogComponent implements OnInit, AfterViewInit, AfterViewInit, AfterContentChecked, OnDestroy{
  isModifiedMenus = new BehaviorSubject<boolean>(false);
  isModifiedUsers = new BehaviorSubject<boolean>(false);

  title!: string;
  id: number = 0;
  role!: RoleDetailModel;
  formGroup!: UntypedFormGroup;
  accessMenu!: Array<RoleMenuItem>
  accessUsers!: Array<RoleUserItem>
  @ViewChild('mystepper') stepper: MatStepper;
  totalStepsCount!: 3;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly dialogRef: MatDialogRef<RoleEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleModel,
    private readonly roleDataService: RoleDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly snackBar: SnackbarService) {
    this.id = this.data ? this.data.id : 0;
    this.title = this.data ? "roles.edit" : "roles.add";
  }
   

  ngOnInit(): void {
   
    let getRole: GetRole = { id: this.id  };
    forkJoin([this.roleDataService.get(getRole)]).pipe(takeUntil(this.destroy$)).subscribe(([role]) => {
      this.role = role;
      this.formGroup = this.formBuilder.group({
        id: [this.role ? this.role.id : '0', [Validators.required]],
        name: [this.role ? this.role.name : '', [Validators.required]],
        translatedName: [this.role ? this.role.translatedName : '', [Validators.required]],
        code: [this.role ? this.role.code : '', [Validators.required]],
        isDefault: [this.role ? this.role.isDefault : false],
      }).setOriginalForm();
    });
  }
 

  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }
  refreshMenu(event: SelectionModel<TreeItemFlatNode<RoleMenuItem>>) {
    if (this.accessMenu) this.isModifiedMenus.next(this.compareArray(this.accessMenu, event.selected.map((x: TreeItemFlatNode<RoleMenuItem>) => x.item.node)))
    this.accessMenu = [...event.selected.map((x: TreeItemFlatNode<RoleMenuItem>) => x.item.node)];
  }
  
  refreshUsers(event: Array<RoleUserItem>) {
    if (this.accessUsers) this.isModifiedUsers.next(this.compareArray(this.accessUsers, event));
    this.accessUsers = event;
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
      users: this.accessUsers,
      menu: this.accessMenu
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
      users: this.accessUsers,
      menu: this.accessMenu
    };
    this.roleDataService.update(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }
  compareArray<T>(accessMenu: T[], arg1: T[]) {
    return JSON.stringify(accessMenu)  !== JSON.stringify(arg1);
  }
  onCancel() {
    if (this.formGroup.isChanged()) this.confirmDialogService.confirmClose(this.dialogRef);
    else this.dialogRef.close(false);
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.isModifiedMenus.next(false);
    this.isModifiedMenus.complete();
    this.isModifiedUsers.next(false);
    this.isModifiedUsers.complete();
  }
}
