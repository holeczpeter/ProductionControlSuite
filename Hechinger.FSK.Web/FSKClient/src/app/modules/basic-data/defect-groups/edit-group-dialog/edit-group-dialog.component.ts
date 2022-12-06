import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewTreeItem, EditTreeItem, EntityGroupModel, EntityGroupRelationModel, SaveEntityGroup } from '../../../../models/generated/generated';
import { EntityGroupDataService } from '../../../../services/data/entity-group-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { TreeService } from '../../../../services/tree/tree.service';

@Component({
  selector: 'app-edit-group-dialog',
  templateUrl: './edit-group-dialog.component.html',
  styleUrls: ['./edit-group-dialog.component.scss']
})
export class EditGroupDialogComponent implements OnInit {

  title: string;
  formGroup: UntypedFormGroup;

  constructor(private readonly dialogRef: MatDialogRef<EditGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTreeItem,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly entityGroupDataService: EntityGroupDataService,
    private readonly snackBar: SnackbarService,
    private readonly treeService: TreeService,
    public languageService: LanguageService) {
    this.title = this.data ? "products.edit" : "products.add";
    this.formGroup = this.formBuilder.group({
      id: [this.data.current.node.id, [Validators.required]],
      name: [this.data.current.node.name, [Validators.required]],
      translatedName: [this.data.current.node.translatedName, [Validators.required]],
      groupType: [this.data.current.node.groupType, [Validators.required]],
      parentId: [this.data.current.node.parentId, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  onSave() {
    this.data.current.node.id= this.formGroup.get('id')?.value;
    this.data.current.node.name = this.formGroup.get('name')?.value;
    this.data.current.node.translatedName = this.formGroup.get('translatedName')?.value;
    this.data.current.node.groupType = this.formGroup.get('groupType')?.value;
    this.data.current.node.parentId = this.formGroup.get('parentId')?.value;
    //let save = this.treeService.copyTree(this.data.current);
    let saveEntityGroup: SaveEntityGroup = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      translatedName: this.formGroup.get('translatedName')?.value,
      groupType: this.formGroup.get('groupType')?.value.id,
      children: new Array<SaveEntityGroup>(),
      collapsed: false,
      parentId: this.formGroup.get('parentId')?.value.id,
      relations: new Array<EntityGroupRelationModel>(),
    };
    //saveEntityGroup.children = this.treeService.map(this.data.current);
    this.entityGroupDataService.save(saveEntityGroup).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.dialogRef.close(true);
    });
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
