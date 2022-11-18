import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../../services/account.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { SortService } from '../../../services/table/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { DefectGroupWizardComponent } from './defect-group-wizard/defect-group-wizard.component';

@Component({
  selector: 'app-defect-groups',
  templateUrl: './defect-groups.component.html',
  styleUrls: ['./defect-groups.component.scss']
})
export class DefectGroupsComponent implements OnInit {
  title = "defectgroups.title";
  constructor(private readonly productDataService: ProductDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public tableFilterService: TableFilterService,
    public compareService: CompareService,
    public sortService: SortService,
    private readonly exportService: TableExportService,
    public paginationService: PaginationService,
    private readonly filterService: DefectFilterService) { }

  ngOnInit(): void {
  }
  initalize() {

  }
  onAdd() {
    let dialogRef = this.dialog.open(DefectGroupWizardComponent, {
      disableClose: true,
      autoFocus: false,
      data: 0,
      minWidth: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
}
