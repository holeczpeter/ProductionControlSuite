import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EntityGroupModel, EntityGroupRelationModel, EntityTypes, ProductModel } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
import { EntityGroupService } from '../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-defect-group-product-editor',
  templateUrl: './defect-group-product-editor.component.html',
  styleUrls: ['./defect-group-product-editor.component.scss']
})
export class DefectGroupProductEditorComponent implements OnInit, OnChanges {
  @Input() tree: TreeItem<EntityGroupModel>;
  @Output() refreshTree = new EventEmitter<any>();
  productIds: number[];
  constructor(public languageService: LanguageService,
    private entityGroupService: EntityGroupService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes["tree"]) this.initalize();
  }
  initalize() {
    this.productIds = this.tree ? this.tree.node.relations.map(x => x.entityId) : new Array<number>();
    this.entityGroupService.refreshProducts(this.productIds);
  }
  ngOnInit() {
  }
 
  onRefreshProducts(product: Array<ProductModel>) {
    this.entityGroupService.refreshProducts(product.map(x => x.id));
    let products = product as Array<ProductModel>;
    let relations = new Array<EntityGroupRelationModel>();
    products.forEach(x => {
      let current: EntityGroupRelationModel = {
        id: 0,
        order:0,
        entityId: x.id,
        name: x.name,
        parentId: 0,
        code: x.code,
        translatedName: x.translatedName,
        entityType: EntityTypes.Product,
        entityGroupId:this.tree.node.id
      };
      relations.push(current);
    })
    this.tree.node.relations = [...relations];
    this.refreshTree.emit(this.tree);
  }
}
