import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { EntityGroupModel, GroupTypes, ProductModel, SaveEntityGroup } from '../../../../models/generated/generated';
import { TreeItem } from '../../../../models/tree-item';
import { DefectGroupDataService } from '../../../../services/data/defect-group-data.service';
import { EntityGroupDataService } from '../../../../services/data/entity-group-data.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { EntityGroupService } from '../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-defect-group-wizard',
  templateUrl: './defect-group-wizard.component.html',
  styleUrls: ['./defect-group-wizard.component.scss']
})
export class DefectGroupWizardComponent implements OnInit {
  title!: string;
  context: any;
  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('mystepper') stepper: MatStepper;
  totalStepsCount!: 3;
  isHead = false;
  data: TreeItem<EntityGroupModel>;
  constructor(private readonly dialogRef: MatDialogRef<DefectGroupWizardComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingData: TreeItem<EntityGroupModel>,
    private entityGroupDataService: EntityGroupDataService,
    private readonly defectGroupDataService: DefectGroupDataService,
    private readonly productDataService: ProductDataService,
    public entityGroupService: EntityGroupService,
    private readonly snackBar: SnackbarService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
    this.title = this.incomingData  ? "defectgroups.edit" : "defectgroups.add";
  }

  ngOnInit(): void {
    if (this.incomingData.node.id != 0) {
      let request = { id: this.incomingData.node.id };
      this.entityGroupDataService.get(request).subscribe(x => {
        console.log(x)
        this.data = x;
        if (this.data) this.isHead = this.data.node.groupType == GroupTypes.Head;
        else this.isHead = true;
      })
    }
    else {
      this.data = this.incomingData;
      if (this.data)  this.isHead = this.data.node.groupType == GroupTypes.Head;
      else this.isHead = true;
    }
  }
 
  refreshTree(event: any) {
    this.data = event;
    if (this.data) this.isHead = this.data.node.groupType == GroupTypes.Head;
    else this.isHead = true;
  }
  
  goBack(stepper: MatStepper) {
    this.stepper.previous();
  }
  goForward(stepper: MatStepper) {
    this.stepper.next();
  }
  onSave() {
    let saveEntityGroup: SaveEntityGroup = {
      current: this.data
    };
    this.entityGroupDataService.save(saveEntityGroup).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
}
