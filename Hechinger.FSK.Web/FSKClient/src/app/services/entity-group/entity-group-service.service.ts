import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { EntityGroupModel } from '../../models/generated/generated';
import { TreeItem } from '../../models/tree-item';

@Injectable({
  providedIn: 'root'
})
export class EntityGroupService {
  treeForm: UntypedFormGroup;
  private subject = new Subject<TreeItem<EntityGroupModel>>();
  public getCurrentTree() {
    return this.subject.asObservable();
  }
  private productSubject = new BehaviorSubject<Array<number>>(new Array<number>());
  public getProductIds() {
    return this.productSubject.asObservable();
  }
  private operationSubject = new BehaviorSubject<Array<number>>(new Array<number>());
  public getOperationIds() {
    return this.productSubject.asObservable();
  }
  constructor(private formBuilder: FormBuilder) { }
  getChildren(form: FormGroup): FormArray {
    console.log(form)
    return form?.get('children') as FormArray;
  }
  buildForm(item: TreeItem<EntityGroupModel>) {
    

    const node: { [id: string]: AbstractControl } = {};
    for (const [key, value] of Object.entries(item.node)) {
      node[key] = new FormControl(value);
    }

    if (item.children) {
      node['children'] = this.formBuilder.array(item.children.map(el => this.buildForm(el)))
    }
   
    return this.formBuilder.group(node);
  }

  refreshTree(tree: TreeItem<EntityGroupModel>) {
    this.treeForm = this.buildForm(tree);
    console.log(this.treeForm)
    this.subject.next(tree);
  }
  
  refreshProducts(productIds: Array<number>) {
    this.productSubject.next(productIds);
  }
  refreshOperations(operationIds: Array<number>) {
    this.operationSubject.next(operationIds);
  }
}
