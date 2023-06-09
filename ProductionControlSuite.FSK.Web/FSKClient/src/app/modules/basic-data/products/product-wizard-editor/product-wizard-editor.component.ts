import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { GetProductContext, ProductContext, SaveProductContext } from '../../../../models/generated/generated';
import { ConfirmDialogService } from '../../../../services/confirm-dialog/confirm-dialog-service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { LanguageService } from '../../../../services/language/language.service';
import { ProductContextService } from '../../../../services/productcontext/product-context-.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-product-wizard-editor',
  templateUrl: './product-wizard-editor.component.html',
  styleUrls: ['./product-wizard-editor.component.scss']
})
export class ProductWizardEditorComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
  title!: string;
  product: ProductContext;
  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('mystepper') stepper: MatStepper;
  totalStepsCount!: 3;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly dialogRef: MatDialogRef<ProductWizardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly productDataService: ProductDataService,
    public productContextService: ProductContextService,
    private readonly snackBar: SnackbarService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
    this.title = this.data > 0 ? "products.edit" : "products.add";
  }

  ngOnInit(): void {
    this.refresh(this.data);
    
  }
  refresh(productId: number) {
    let productRequest: GetProductContext = {
      id: productId,
    };
    forkJoin([this.productDataService.getProductContext(productRequest)]).pipe(takeUntil(this.destroy$)).subscribe(([product]) => {
      this.product = product;
      this.productContextService.buildForm(this.product);
    });
  }
  

  goBack(stepper: MatStepper) {
    this.stepper.previous();
  }
  goForward(stepper: MatStepper) {
    this.stepper.next();
  }

  goForwardAndSaveProduct(stepper: MatStepper) {
    let model: SaveProductContext = {
      id: this.productContextService.formGroup.get('id')?.value,
      name: this.productContextService.formGroup.get('name')?.value,
      code: this.productContextService.formGroup.get('code')?.value,
      translatedName: this.productContextService.formGroup.get('translatedName')?.value,
      workshopId: this.productContextService.formGroup.get('workshop')?.value.id,
      operations: this.productContextService.getOperations.value
    };
   
    this.productDataService.saveProductContext(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) {
        this.dialogRef.close(true);
      }
    });
  }

  onCancel() {
    if (this.productContextService.isChanged()) this.confirmDialogService.confirmClose(this.dialogRef);
    else this.dialogRef.close(false);
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


