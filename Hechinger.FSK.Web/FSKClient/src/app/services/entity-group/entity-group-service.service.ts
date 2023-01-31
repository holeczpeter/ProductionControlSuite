import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, pairwise, startWith } from 'rxjs';
import { EntityGroupModel, EntityGroupRelationModel, GroupTypes } from '../../models/generated/generated';
import { TreeItem } from '../../models/tree-item';
import { EntityGroupDataService } from '../data/entity-group-data.service';

@Injectable({
  providedIn: 'root'
})
export class EntityGroupService {
 
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
    console.log(form)
    return form.get('node')?.get('relations') as FormArray;
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
        console.log(rel)
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
    console.log(remove)
    remove.removeAt(i);
  }

  refreshRelationsInParent(parent: UntypedFormGroup, items: Array<EntityGroupRelationModel>) {
    const relations = this.getRelationByCurrentForm(parent);
    relations.clear();
    items.forEach((rel: EntityGroupRelationModel) => this.addRelationsToParent(parent, rel));
    
  }

  drop(event: CdkDragDrop<EntityGroupRelationModel[]>, parent: UntypedFormGroup, isRelation: boolean) {
    console.log(event)
    console.log(parent)
    console.log(isRelation)
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
      console.log(event.previousContainer)
      if (event.previousContainer.data != null && event.previousContainer.data.length == 1) {
        parent.get('node')?.get('name')?.setValue(event.previousContainer.data[0].name);
      } 
      this.refreshRelationsInParent(parent, event.previousContainer.data);
    }
    this.operationChangedSubject.next(true);
  }
}
