import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin, of, Subject } from 'rxjs';
import { DefectContext, EnumModel, OperationContext, OperationModel, ProductContext, WorkshopModel } from '../../models/generated/generated';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog-service';
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
    private readonly defectDataService: DefectDataService,
    private readonly confirmDialogService: ConfirmDialogService) {
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
        hasOperation: [productContext ? productContext.hasOperation : false],
        operations: this.formBuilder.array(new Array<OperationModel>())
      });
      productContext?.operations?.forEach(op => this.addOperation(op));
      this.formGroup.setOriginalForm();
    });
    
  }
  mainFormIsValid() {
    return this.formGroup.get('name')?.valid &&
      this.formGroup.get('code')?.valid &&
      this.formGroup.get('translatedName')?.valid &&
      this.formGroup.get('workshop')?.valid;
  }
  isOperationsValid() {
    for (let i = 0; i < this.getOperations.controls.length; i++) {
      const formElementRegistry = this.getOperations.controls[i];
      if ((!formElementRegistry.get('name')?.valid ||
        !formElementRegistry.get('code')?.valid ||
        !formElementRegistry.get('translatedName')?.valid ||
        !formElementRegistry.get('order')?.valid)) return true;
    }
    return false;
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
      hasDefect: [operation ? operation.hasDefect : false],
      defects: this.formBuilder.array(new Array<OperationModel>())
    }));
    
    operation?.defects?.forEach(d => this.addDefect(d, operations.length-1));
  }
  removeOperation(i: number) {
    this.confirmDialogService.openDeleteConfirm('operation.confirmDelete').subscribe(result => {
      if (result) {
        const remove = this.getOperations;
        let current = this.getOperations.controls[i];
        if (current && current.get('hasDefect')?.value == true) this.confirmDialogService.openError("operation.existingRelation").subscribe();
        else remove.removeAt(i);
      }
    });
    
  }
  addDefect(defect: DefectContext | null, opIndex: number) {
    const defects = this.getDefects(opIndex);
    defects.push(this.formBuilder.group({
      id: [defect ? defect.id : 0, [Validators.required]],
      name: [defect ? defect.name : '', [Validators.required]],
      code: [defect ? defect.code : '', [Validators.required]],
      order: [defect ? defect.order : '', [Validators.required]],
      translatedName: [defect ? defect.translatedName : '', [Validators.required]],
      hasCard: [defect ? defect.hasCard : false],
      defectCategory: [defect ? defect.defectCategory : '', [Validators.required]],
    }));
    
  }

  removeDefect(i: number, opIndex: number) {
    this.confirmDialogService.openDeleteConfirm('fehler.confirmDelete').subscribe(result => {
      if (result) {
        const remove = this.getDefects(opIndex);
        let current = remove.controls[i];
        if (current && current.get('hasCard')?.value == true) this.confirmDialogService.openError("fehler.existingRelation").subscribe();
        else remove.removeAt(i);
      }
    });
   
  }
  isChanged() {
    return this.formGroup.isChanged();
  }
}
