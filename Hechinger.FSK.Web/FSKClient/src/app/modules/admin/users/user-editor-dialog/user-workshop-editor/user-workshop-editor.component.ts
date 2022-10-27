import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, map, Observable, startWith } from 'rxjs';
import { GetWorkshopsByUser, GetWorkshopsExceptByUser, WorkshopUserItem } from '../../../../../models/generated/generated';
import { AccountService } from '../../../../../services/account.service';
import { UserDataService } from '../../../../../services/data/user-data.service';
@Component({
  selector: 'app-user-workshop-editor',
  templateUrl: './user-workshop-editor.component.html',
  styleUrls: ['./user-workshop-editor.component.scss']
})
export class UserWorkshopEditorComponent implements OnInit, OnChanges {
  @Input() userId!: number;
  @Output() resfresh = new EventEmitter<Array<WorkshopUserItem>>();
  dataSource!: MatTableDataSource<AbstractControl>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: Array<string> = ['name', 'code', 'delete']
  filteredWorkshops!: Observable<WorkshopUserItem[]>;
  allWorkshops!: Array<WorkshopUserItem>;
  workshopInputCtrl = new UntypedFormControl();

  @ViewChild('workshopNameInput') workshopNameInput!: ElementRef<HTMLInputElement>;

  formGroup!: UntypedFormGroup;
  get workshops(): FormArray<AbstractControl<WorkshopUserItem>> {
    return this.formGroup.get('workshops') as FormArray<AbstractControl<WorkshopUserItem>>;
  }

  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly userDataService: UserDataService,
    private accountService: AccountService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes["userId"]) {
      let getUserByRole: GetWorkshopsByUser = { userId: this.userId };
      let getUserExceptRole: GetWorkshopsExceptByUser = { userId: this.userId };
      forkJoin([this.userDataService.getWorkshopsByUser(getUserByRole),
        this.userDataService.getWorkshopsExceptByUser(getUserExceptRole)]).subscribe(([usersByRole, workshops]) => {
          console.log(workshops)
        this.allWorkshops = workshops;
        this.formGroup = this.formBuilder.group({
          workshops: this.formBuilder.array(new Array<WorkshopUserItem>())
        });
        this.dataSource = new MatTableDataSource<AbstractControl>();
        this.workshops.valueChanges.subscribe(x => {
          this.dataSource.data = this.workshops.controls;
          this.resfresh.emit(this.workshops.value);
        });
        usersByRole.forEach((d: WorkshopUserItem) => this.addRow(d));

        this.filteredWorkshops = this.workshopInputCtrl.valueChanges.pipe(
          startWith(''),
          map(value => {
            if (typeof value === 'string') return this.allWorkshops.filter(x => x.name.toLowerCase().includes(value.toLowerCase()) || x.code.toLowerCase().includes(value.toLowerCase()))
            else return this.allWorkshops
          }));
      });
    }
  }
  addRow(userRoleItem: WorkshopUserItem) {
    const row = this.formBuilder.group({
      'id': [userRoleItem.id],
      'code': [userRoleItem.code],
      'name': [userRoleItem.name],
    });
    this.workshops.push(row);
    this.removeFromAll(userRoleItem);
  }

  removeRow(element: WorkshopUserItem) {
    let index = this.workshops.value.findIndex((user: any) => user.id === element.id);
    this.workshops.removeAt(index);
    this.removeFromAll(element);
  }

  addToAll(element: WorkshopUserItem) {
    this.allWorkshops.push(element);
  }

  removeFromAll(element: WorkshopUserItem) {
    let current = this.allWorkshops.find(user => user.id == element.id);
    if (current) {
      let index = this.allWorkshops.indexOf(current);
      if (index > -1) this.allWorkshops.splice(index, 1);
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    this.workshopNameInput.nativeElement.value = '';
    let current = this.allWorkshops.find(x => x.id == event.option.value.id);
    if (current) this.addRow(current);
  }

  onRemove(element: WorkshopUserItem): void {
    this.removeRow(element);
  }

  trackByIdFn(option: number) {
    return option;
  }
}
