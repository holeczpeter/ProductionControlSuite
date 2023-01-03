import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EntityGroupModel, EntityGroupRelationModel, EnumModel, GetGroupTypes, GroupTypes } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
import { EntityGroupDataService } from '../../../../../services/data/entity-group-data.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { SnackbarService } from '../../../../../services/snackbar/snackbar.service';
import { TreeService } from '../../../../../services/tree/tree.service';

@Component({
  selector: 'app-defect-group-data-editor',
  templateUrl: './defect-group-data-editor.component.html',
  styleUrls: ['./defect-group-data-editor.component.scss']
})
export class DefectGroupDataEditorComponent implements OnInit, OnChanges {
  @Input() tree: TreeItem<EntityGroupModel>;
  @Output() refreshTree = new EventEmitter<any>();
  @Output() isHead = new EventEmitter<boolean>();
  formGroup: UntypedFormGroup;
  groupTypes!: EnumModel[];
  constructor(
    private entityGroupDataService: EntityGroupDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService,
    private readonly treeService: TreeService,
    public languageService: LanguageService) { }


  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes["tree"]) this.initalize();
  }
  initalize() {
    let request: GetGroupTypes = { isAll: false };
    this.entityGroupDataService.getGroupTypes(request).subscribe(x => {
     
      this.groupTypes = x;
      this.formGroup = this.formBuilder.group({
        id: [this.tree ? this.tree.node.id : 0, [Validators.required]],
        name: [this.tree ? this.tree.node.name : '', [Validators.required]],
        translatedName: [this.tree ? this.tree.node.translatedName : '', [Validators.required]],
        groupType: [this.tree ? this.tree.node.groupType : GroupTypes.Group, [Validators.required]],
        ppmGoal: [this.tree ? this.tree.node.ppmGoal : 0],
        parentId: [this.tree ? this.tree.node.parentId : 0],
      });
      
      this.formGroup.valueChanges.subscribe(x => {
        this.tree.node.id = this.formGroup.get('id')?.value;
        this.tree.node.name = this.formGroup.get('name')?.value;
        this.tree.node.ppmGoal = this.formGroup.get('ppmGoal')?.value;
        this.tree.node.translatedName = this.formGroup.get('translatedName')?.value;
        this.tree.node.groupType = this.formGroup.get('groupType')?.value;
        this.tree.node.parentId = this.formGroup.get('parentId')?.value;
        this.refreshTree.emit(this.tree);
      });
      
    });
    
  }
}
