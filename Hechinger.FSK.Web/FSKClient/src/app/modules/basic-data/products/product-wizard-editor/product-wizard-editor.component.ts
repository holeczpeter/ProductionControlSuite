import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { forkJoin } from 'rxjs';
import { EnumModel, GetProductContext, ProductContext, SaveProductContext, WorkshopModel } from '../../../../models/generated/generated';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { WorkshopDataService } from '../../../../services/data/workshop-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-product-wizard-editor',
  templateUrl: './product-wizard-editor.component.html',
  styleUrls: ['./product-wizard-editor.component.scss']
})
export class ProductWizardEditorComponent implements OnInit, AfterViewInit, AfterContentChecked {
  title!: string;
  product: ProductContext;
  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('mystepper') stepper: MatStepper;
  totalStepsCount!: 3;
  workshops!: WorkshopModel[];
  categories: EnumModel[];
  constructor(private readonly dialogRef: MatDialogRef<ProductWizardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly productDataService: ProductDataService,
    private readonly defectDataService: DefectDataService,
    private readonly workshopDataService: WorkshopDataService,
    private readonly snackBar: SnackbarService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
    this.title = this.data > 0 ? "products.edit" : "products.add";
  }

  ngOnInit(): void {
    
    if (!this.workshops || !this.categories) {
      forkJoin([this.workshopDataService.getAll(), this.defectDataService.getAllDefectCategories()]).subscribe(([workshops,categories]) => {
        this.workshops = workshops;
        this.categories = categories;
        this.refresh(this.data);
      });
    }
    else this.refresh(this.data);
  }
  refresh(productId: number) {
    let productRequest:GetProductContext  = {
      id: productId,
    };

    forkJoin([this.productDataService.getProductContext(productRequest)]).subscribe(([product]) => {
        this.product = product;
      });
  }
  refreshProduct(event: ProductContext) {
    this.product = event;
  }
  
  goBack(stepper: MatStepper) {
    this.stepper.previous();
  }
  goForward(stepper: MatStepper) {
    this.stepper.next();
  }

  goForwardAndSaveProduct(stepper: MatStepper) {

    let model: SaveProductContext = {
      id: this.product.id,
      name: this.product.name,
      code: this.product.code,
      translatedName: this.product.translatedName,
      workshopId: this.product.workshopId,
      operations: this.product.operations,
    };
    this.productDataService.saveProductContext(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) {
        this.refresh(result.entities);
        this.goForward(stepper);
      }
    });
  }
  
  onCancel() {
    this.dialogRef.close(false);
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
}


