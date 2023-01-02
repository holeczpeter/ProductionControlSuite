import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin, of, Subject } from 'rxjs';
import { DefectContext, EnumModel, OperationContext, OperationModel, ProductContext, WorkshopModel } from '../../models/generated/generated';
import { DefectDataService } from '../data/defect-data.service';
import { WorkshopDataService } from '../data/workshop-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductContextService {
  formGroup: UntypedFormGroup;
  private workshopSubject = new BehaviorSubject<WorkshopModel[]>(new Array<WorkshopModel>());
  public getWorkShops() {
    return this.workshopSubject.asObservable();
  }
  private categoriesSubject = new BehaviorSubject<EnumModel[]>(new Array<EnumModel>());
  getCategories() {
    return this.categoriesSubject.asObservable();
  }
  get getOperations(): FormArray {
    return this.formGroup.get('operations') as FormArray;
  }
  getDefects(index: number) {
    return this.getOperations.at(index).get('defects') as FormArray
  }
  
  
  constructor(private readonly formBuilder: UntypedFormBuilder,
    private readonly worksshopDataService: WorkshopDataService,
    private readonly defectDataService: DefectDataService) {
    forkJoin([this.getWorkShopsQuery(), this.getCategoriesQuery()]).subscribe(([workshops, categories]) => {
      this.workshopSubject.next(workshops);
      this.categoriesSubject.next(categories);
      
    });
  }

  buildForm(productContext: ProductContext) {
    this.getWorkShops().subscribe(workshops => {
    
      this.formGroup = this.formBuilder.group({
        id: [productContext ? productContext.id : '0', [Validators.required]],
        name: [productContext ? productContext.name : '', [Validators.required]],
        code: [productContext ? productContext.code : '', [Validators.required]],
        translatedName: [productContext ? productContext.translatedName : '', [Validators.required]],
        workshop: [productContext ? workshops.find(ws => ws.id == productContext!.workshopId) : null, [Validators.required]],
        operations: this.formBuilder.array(new Array<OperationModel>())
      });
      productContext?.operations?.forEach(op => this.addOperation(op));
    });
    
  }

  getCategoriesQuery() {
    return this.defectDataService.getAllDefectCategories();
  }
  getWorkShopsQuery() {
    return this.worksshopDataService.getAll();
  }
  

  addOperation(operation: OperationContext | null) {
    const operations = this.getOperations;
    operations.push(this.formBuilder.group({
      id: [operation ? operation.id : 0],
      name: [operation ? operation.name : '', [Validators.required]],
      code: [operation ? operation.code : '', [Validators.required]],
      order: [operation ? operation.order : '', [Validators.required]],
      norma: [operation ? operation.norma : 0],
      ppmGoal: [operation ? operation.ppmGoal : 0],
      operationTime: [operation ? operation.operationTime : 0],
      translatedName: [operation ? operation.translatedName : '', [Validators.required]],
      defects: this.formBuilder.array(new Array<OperationModel>())
    }));
    
    operation?.defects?.forEach(d => this.addDefect(d, operations.length-1));
  }
  removeOperation(i: number) {
    const remove = this.getOperations;
    remove.removeAt(i);
  }
  addDefect(defect: DefectContext | null, opIndex: number) {
    const defects = this.getDefects(opIndex);
    defects.push(this.formBuilder.group({
      id: [defect ? defect.id : 0, [Validators.required]],
      name: [defect ? defect.name : '', [Validators.required]],
      code: [defect ? defect.code : '', [Validators.required]],
      order: [defect ? defect.order : '', [Validators.required]],
      translatedName: [defect ? defect.translatedName : '', [Validators.required]],
      defectCategory: [defect ? defect.defectCategory : '', [Validators.required]],
    }));
    
  }

  removeDefect(i: number, opIndex: number) {
    const remove = this.getDefects(opIndex);
    remove.removeAt(i);
  }
}
