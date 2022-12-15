import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { EntityGroupModel } from '../../models/generated/generated';
import { TreeItem } from '../../models/tree-item';

@Injectable({
  providedIn: 'root'
})
export class EntityGroupService {
  private subject = new Subject<TreeItem<EntityGroupModel>>();
  public getCurrentTree() {
    return this.subject.asObservable();
  }
  private productSubject = new BehaviorSubject<Array<number>>(new Array<number>());
  public getProductIds() {
    return this.productSubject.asObservable();
  }
  constructor() { }

  refreshTree(tree: TreeItem<EntityGroupModel> ) {
    this.subject.next(tree);
  }
  refreshProducts(productIds: Array<number>) {
    this.productSubject.next(productIds);
  }
}
