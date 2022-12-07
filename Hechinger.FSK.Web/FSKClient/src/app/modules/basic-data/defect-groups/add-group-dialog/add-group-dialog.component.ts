import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewTreeItem, EditTreeItem, EntityGroupModel, EntityGroupRelationModel, EnumModel, GetGroupTypes, SaveEntityGroup } from '../../../../models/generated/generated';
import { EntityGroupDataService } from '../../../../services/data/entity-group-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { TreeService } from '../../../../services/tree/tree.service';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit {
  title: string;
  formGroup: UntypedFormGroup;
  groupTypes!: EnumModel[];
  constructor(private readonly dialogRef: MatDialogRef<AddGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddNewTreeItem,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly entityGroupDataService: EntityGroupDataService,
    private readonly snackBar: SnackbarService,
    private readonly treeService: TreeService,
    public languageService: LanguageService) {
    this.title = this.data ? "products.edit" : "products.add";
   
  }

  ngOnInit(): void {
    let request: GetGroupTypes = { isAll : false };
    this.entityGroupDataService.getGroupTypes(request).subscribe(x => {
      console.log(this.groupTypes)
      this.groupTypes = x;
      this.formGroup = this.formBuilder.group({
        id: ['0', [Validators.required]],
        name: ['', [Validators.required]],
        translatedName: ['', [Validators.required]],
        groupType: [0, [Validators.required]],
        parentId: [this.data ? this.data.parent.node.id : 0],
      });
    });
  }

  onSave() {
    let current: EntityGroupModel = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      groupType: this.formGroup.get('groupType')?.value,
      parentId: this.formGroup.get('parentId')?.value,
      relations: new Array<EntityGroupRelationModel>(),
    }
    let treeItem = {
      node: current,
      children: new Array<any>(),
      collapsed: false,
    }

    let saveEntityGroup: SaveEntityGroup = {
      current: treeItem
    };
    this.entityGroupDataService.save(saveEntityGroup).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
