import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BehaviorSubject, pairwise, startWith } from 'rxjs';
import { EntityGroupModel, EntityGroupRelationModel, GroupTypeColor, GroupTypes } from '../../models/generated/generated';
import { TreeItem } from '../../models/tree-item';
import { EntityGroupDataService } from '../data/entity-group-data.service';

@Injectable({
  providedIn: 'root'
})
export class EntityGroupService {
  colors: Array<GroupTypeColor> = [
    { id: 0, name: 'Hibaösszesítő csoport', color: '#F9A825' },
    { id: 1, name: 'Hibaösszesítő', color: '#4CAF50' },
  ];
  colorStyle(id: number) {
    let color = this.colors.find(x => x.id === id)?.color;
    return { 'border-left-style': 'solid', 'border-color': color, 'margin-left': '15px' }
  }
  treeForm: UntypedFormGroup;
  groupTypes = this.entityGroupDataService.getGroupTypes({ isAll: false });
  productChangedSubject = new BehaviorSubject<boolean>(false);
  public getProductChanged() {
    return this.productChangedSubject.asObservable();
  }
  operationChangedSubject = new BehaviorSubject<boolean>(false);
  public getOperationChanged() {
    return this.operationChangedSubject.asObservable();
  }

  get getChildren(): FormArray {
    return this.treeForm.get('children') as FormArray;
  }
  getChildrenByCurrentForm(form: UntypedFormGroup): FormArray {
    return form.get('children') as FormArray;
  }
  get getRelations(): FormArray {
    return this.treeForm.get('node')?.get('relations') as FormArray;
  }
  getRelationByCurrentForm(form: UntypedFormGroup): FormArray {
    return form.get('node')?.get('relations') as FormArray;
  }
  getAllDefectRelation(form: UntypedFormGroup) {
    const results = new Array<EntityGroupRelationModel>();
    const children = this.getChildrenByCurrentForm(form) as FormArray;
    for (let control of children.controls) {
      let fg = control as UntypedFormGroup;
      let currentRel = this.getRelationByCurrentForm(fg).value;
      currentRel.forEach((i: EntityGroupRelationModel) => { results.push(i) });
    }
    return results;
  }
  getAllDefectsBy(form: UntypedFormGroup): Observable<EntityGroupRelationModel[]> {
    let operations = this.getRelationByCurrentForm(form).value;
    let operationsIds = operations.map((x: EntityGroupRelationModel) => x.entityId).map((u: number) => u.toString()).join(',');
    let params = new HttpParams();
    params = params.append('operationIds', operationsIds);
    params = params.append('groupId', this.treeForm.get('id')?.value);
    return this.entityGroupDataService.getDefectsForRelation(params);
  }
  getSelectableDefectsBy(form: UntypedFormGroup, array: Array<EntityGroupRelationModel>) {
    const allUsed = this.getAllDefectRelation(form);
    const difference = array?.filter(x => !allUsed.map((x: EntityGroupRelationModel) => x.entityId).includes(x.entityId));
    return difference;
  }
  getAllOperationRelation() {
    const results = new Array<EntityGroupRelationModel>();
    const children = this.treeForm.get('children') as FormArray;
    for (let control of children.controls) {
      let fg = control as UntypedFormGroup;
      let currentRel = this.getRelationByCurrentForm(fg).value;
      currentRel.forEach((i: EntityGroupRelationModel) => { results.push(i) });
    }
    return results;
  }
 
  private _allOperations: Array<EntityGroupRelationModel>;
  get allOperations() {
    return this._allOperations;
  }
  set allOperations(operation: Array<EntityGroupRelationModel>) {
  
    this._allOperations = [...operation];
  }
  private _selectableOperations: Array<EntityGroupRelationModel>;
  get selectableOperations() {
    return this._selectableOperations;
  }
  set selectableOperations(operation: Array<EntityGroupRelationModel>) {
    this._selectableOperations = [...operation];
  }
  
  constructor(private formBuilder: FormBuilder, private entityGroupDataService: EntityGroupDataService) {
  }

  
  refreshTree(tree: TreeItem<EntityGroupModel>) {
    this.treeForm = this.buildForm(tree);
    this.productsValueChange();
  }
 
  buildForm(item: TreeItem<EntityGroupModel>) {
    let nodeForm = this.formBuilder.group({
      node: this.createNode(item.node),
      collapsed: [false, [Validators.required]],
      children: this.formBuilder.array(item.children.map(rel => this.createOpChild(rel))),
    });
    this.operationChangedSubject.next(true);
    return nodeForm;
  }

  createOpChild(item: TreeItem<EntityGroupModel>) {
    const fg = this.formBuilder.group({
      node: this.createNode(item.node),
      collapsed: [false, [Validators.required]],
      children: this.formBuilder.array(item.children.map(rel => this.createDefChild(rel))),
    });
    return fg;
  }

  createDefChild(item: TreeItem<EntityGroupModel>) {
    const fg = this.formBuilder.group({
      node: this.createNode(item.node),
      collapsed: [false, [Validators.required]],
      children: this.formBuilder.array([]),
    });
    return fg;
  }

  productsValueChange() {
    this.treeForm.get('node')?.get('product')?.valueChanges.pipe(startWith(this.treeForm.get('node')?.get('product')?.value)).pipe(pairwise())
      .subscribe(([prev, next]) => {
       
        
      let p = next as Array<EntityGroupRelationModel>;
      const relations = this.getRelations;
      relations.clear();
      p.forEach((rel: EntityGroupRelationModel) => this.addRelations(rel));
      this.productChangedSubject.next(true);
    });
  }
  removeOperationsByProduct(prev: any, next: any) {
    let removed = prev.filter((x: EntityGroupRelationModel) => !next.map((x: EntityGroupRelationModel) => x.entityId).includes(x.entityId));
    if (removed) {
      const children = this.getChildren.controls;
      children.forEach((x: UntypedFormGroup) => {
        let rel = this.getRelationByCurrentForm(x);
      });
    }
  }
  createNode(node: EntityGroupModel | null): any {
    const currentFormGroup = this.formBuilder.group({
      id: [node ? node.id : 0, [Validators.required]],
      name: [node ? node.name : '', [Validators.required]],
      parentId: [node ? node.parentId : 0, [Validators.required]],
      translatedName: [node ? node.translatedName : '', [Validators.required]],
      order: [node ? node.order : 0, [Validators.required]],
      ppmGoal: [node ? node.ppmGoal : 0, [Validators.required]],
      groupType: [node ? node.groupType : GroupTypes.Group, [Validators.required]],
      relations: node ? this.formBuilder.array(node.relations.map(rel => this.createRelation(rel))) : this.formBuilder.array(new Array<EntityGroupRelationModel>()),
      product: node && node.relations ? new FormControl<EntityGroupRelationModel[]>(node.relations) : new FormControl<EntityGroupRelationModel[]>(new Array<EntityGroupRelationModel>())
    });
    if(node) currentFormGroup.get('product')?.setValue(node.relations);
    return currentFormGroup;
  }

  addChildToParent(parent: UntypedFormGroup, item: TreeItem<EntityGroupModel>,type: GroupTypes) {
    const children = this.getChildrenByCurrentForm(parent);
    switch (type) {
      case 2:
        let newGroup = this.createOpChild(item);
        children.push(newGroup);
        return;
      case 3:
        let newDefGroup = this.createDefChild(item);
        children.push(newDefGroup);
        return;
    }
  }

  removeChildFromParent(parent: UntypedFormGroup, i: number) {
    const remove = this.getChildrenByCurrentForm(parent);
    remove.removeAt(i);
  }

  createRelation(item: EntityGroupRelationModel) {
    return this.formBuilder.group({
      id: [item ? item.id : 0],
      name: [item ? item.name : '', [Validators.required]],
      code: [item ? item.code : '', [Validators.required]],
      order: [item ? item.order : '', [Validators.required]],
      entityGroupId: [item ? item.entityGroupId : 0],
      entityId: [item ? item.entityId : 0],
      translatedName: [item ? item.translatedName : '', [Validators.required]],
      parentId: [item ? item.parentId : 0, [Validators.required]],
      entityType: [item ? item.entityType : '', [Validators.required]],
      selected: [item ? item.selected : false, [Validators.required]],
    });
  }

  addRelations(item: EntityGroupRelationModel) {
    const relations = this.getRelations;
    relations.push(this.formBuilder.group({
      id: [item ? item.id : 0],
      name: [item ? item.name : '', [Validators.required]],
      code: [item ? item.code : '', [Validators.required]],
      order: [item ? item.order : '', [Validators.required]],
      entityGroupId: [item ? item.entityGroupId : 0],
      entityId: [item ? item.entityId : 0],
      translatedName: [item ? item.translatedName : '', [Validators.required]],
      parentId: [item ? item.parentId : 0, [Validators.required]],
      entityType: [item ? item.entityType : '', [Validators.required]],
      selected: [item ? item.selected : false, [Validators.required]],
    }));
  }
  addRelationsToParent(parent: UntypedFormGroup, item: EntityGroupRelationModel) {
    const relations = this.getRelationByCurrentForm(parent);
    relations.push(this.formBuilder.group({
      id: [item ? item.id : 0],
      name: [item ? item.name : '', [Validators.required]],
      code: [item ? item.code : '', [Validators.required]],
      order: [item ? item.order : '', [Validators.required]],
      entityGroupId: [item ? item.entityGroupId : 0],
      entityId: [item ? item.entityId : 0],
      translatedName: [item ? item.translatedName : '', [Validators.required]],
      parentId: [item ? item.parentId : 0, [Validators.required]],
      entityType: [item ? item.entityType : '', [Validators.required]],
      selected: [item ? item.selected : false, [Validators.required]],
    }));
  }

  removeRelationToParent(parent: UntypedFormGroup, i: number) {
    const remove = this.getRelationByCurrentForm(parent);
    remove.removeAt(i);
  }

  refreshRelationsInParent(parent: UntypedFormGroup, items: Array<EntityGroupRelationModel>) {
    const relations = this.getRelationByCurrentForm(parent);
    relations.clear();
    items.forEach((rel: EntityGroupRelationModel) => this.addRelationsToParent(parent, rel));
    
  }

  drop(event: CdkDragDrop<EntityGroupRelationModel[]>, parent: UntypedFormGroup, isRelation: boolean,type: GroupTypes) {
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if (isRelation) {
      if (event.container.data != null && event.container.data.length == 1) {
        parent.get('node')?.get('name')?.setValue(event.container.data[0].name);
      } 
      this.refreshRelationsInParent(parent, event.container.data);
    }
    else {
     
      if (event.previousContainer.data != null && event.previousContainer.data.length == 1) {
        parent.get('node')?.get('name')?.setValue(event.previousContainer.data[0].name);
      } 
      this.refreshRelationsInParent(parent, event.previousContainer.data);
    }
    if (type == GroupTypes.OperationItem || type == GroupTypes.DefectItem) this.operationChangedSubject.next(true);
  }

  //TODO
  //getAllOprelationId //drop => remove   operations  //deleteOp => add operations
  //getAllDefectRElationId //drop => remove defects   //deleteDefect => add defects
  
  
}
