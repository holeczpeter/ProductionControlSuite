import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu, MatMenuPanel } from '@angular/material/menu';
import { EntityGroupModel, GroupTypes } from '../../../../models/generated/generated';
import { TreeItem } from '../../../../models/tree-item';

@Component({
  selector: 'app-quality-menu',
  templateUrl: './quality-menu.component.html',
  styleUrls: ['./quality-menu.component.scss']
})
export class QualityMenuComponent implements OnInit {
  @ViewChild("menu", { static: true }) menu: MatMenuPanel<any>;
  @Input() items: Array<TreeItem<EntityGroupModel>>;
  @Output() select = new EventEmitter<EntityGroupModel>();
  public get groupTypes(): typeof GroupTypes {
    return GroupTypes;
  }

  constructor() { }

  ngOnInit(): void {
    
  }
  hasChildren(item: TreeItem<EntityGroupModel>) {

    return item.children &&
      item.children.length > 0 &&
      item.children.some(x => x.node.groupType == GroupTypes.Group || x.node.groupType == GroupTypes.Head);
  }
  onSelect(group: EntityGroupModel) {
    this.select.emit(group);
  }
}
