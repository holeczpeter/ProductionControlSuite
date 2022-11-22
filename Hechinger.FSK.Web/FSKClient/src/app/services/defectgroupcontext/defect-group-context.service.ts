import { Injectable } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { DefectDataService } from '../data/defect-data.service';
import { WorkshopDataService } from '../data/workshop-data.service';

@Injectable({
  providedIn: 'root'
})
export class DefectGroupContextService {

  formGroup: UntypedFormGroup;
  
  get getHeads(): FormArray {
    return this.formGroup.get('defectGroupContextHeads') as FormArray;
  }
  getItems(index: number) {
    return this.getHeads.at(index).get('defectGroupContextItems') as FormArray
  }

  getRelations(headIndex:number,index: number) {
    return this.getItems(headIndex).at(index).get('defectGroupContextRelations') as FormArray
  }

  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly worksshopDataService: WorkshopDataService,
    private readonly defectDataService: DefectDataService) {
  }

  buildForm(context: any) {
    this.formGroup = this.formBuilder.group({
      id: [context ? context.id : '0', [Validators.required]],
      name: [context ? context.name : '', [Validators.required]],
      defectGroupContextHeads: this.formBuilder.array(new Array<any>())
    });
    //context?.children?.forEach(h => this.addHead(h));

  }

  getCategoriesQuery() {
    return this.defectDataService.getAllDefectCategories();
  }
  getWorkShopsQuery() {
    return this.worksshopDataService.getAll();
  }


  //addHead(head: EntityGroupModel | null) {
  //  const heads = this.getHeads;
  //  heads.push(this.formBuilder.group({
  //    id: [head ? head.id : 0],
  //    name: [head ? head.name : '', [Validators.required]],
  //    code: [head ? head.code : '', [Validators.required]],
  //    defectGroupContextItems: this.formBuilder.array(new Array<EntityGroupModel>())
  //  }));

  //  head?.defectGroupContextItems?.forEach(i => this.addItem(i, heads.length - 1));
  //}
  //removeHead(i: number) {
  //  const remove = this.getHeads;
  //  remove.removeAt(i);
  //}
  //addItem(item: DefectGroupContextItem | null, headIndex: number) {
  //  const items = this.getItems(headIndex);
  //  items.push(this.formBuilder.group({
  //    id: [item ? item.id : 0, [Validators.required]],
  //  }));
  //  item?.defectGroupContextRelations?.forEach(i => this.addRelation(i, headIndex, items.length - 1));
  //}
  //removeDefect(i: number, opIndex: number) {
  //  const remove = this.getItems(opIndex);
  //  remove.removeAt(i);
  //}

  //addRelation(relation: DefectGroupContextRelation | null,headIndex: number, itemIndex: number) {
  //  const relations = this.getRelations(headIndex,itemIndex);
  //  relations.push(this.formBuilder.group({
  //    relationId: [relation?.relationId ? relation?.relationId : 0, [Validators.required]],
  //    defectId: [relation?.defectId ? relation?.defectId : 0, [Validators.required]],
  //    name: [relation ? relation.name : '', [Validators.required]],
  //    code: [relation ? relation.code : '', [Validators.required]],
  //  }));
  //}
  //removeRelation(i: number, headIndex:number, itemIndex: number) {
  //  const remove = this.getRelations(headIndex, itemIndex);
  //  remove.removeAt(i);
  //}

}
