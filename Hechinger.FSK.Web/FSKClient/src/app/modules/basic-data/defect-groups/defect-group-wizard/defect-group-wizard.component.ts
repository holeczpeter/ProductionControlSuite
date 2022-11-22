import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { forkJoin } from 'rxjs';
import { ProductContext, ProductModel } from '../../../../models/generated/generated';
import { DefectGroupDataService } from '../../../../services/data/defect-group-data.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { DefectGroupContextService } from '../../../../services/defectgroupcontext/defect-group-context.service';
import { LanguageService } from '../../../../services/language/language.service';
import { ProductContextService } from '../../../../services/productcontext/product-context-.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-defect-group-wizard',
  templateUrl: './defect-group-wizard.component.html',
  styleUrls: ['./defect-group-wizard.component.scss']
})
export class DefectGroupWizardComponent implements OnInit {
  title!: string;
  context: any;
  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('mystepper') stepper: MatStepper;
  totalStepsCount!: 3;
  constructor(private readonly dialogRef: MatDialogRef<DefectGroupWizardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly defectGroupDataService: DefectGroupDataService,
    private readonly productDataService: ProductDataService,
    public defectGroupContextService: DefectGroupContextService,
    private readonly snackBar: SnackbarService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
    this.title = this.data > 0 ? "defectgroups.edit" : "defectgroups.add";
  }

  ngOnInit(): void {
    this.refresh(this.data);

  }
  refresh(productId: number) {
    let request: any = {
      id: productId,
    };
    forkJoin([this.defectGroupDataService.getDefectGroupContext(request)]).subscribe(([product]) => {
      this.context = product;
      this.defectGroupContextService.buildForm(this.context);
    });
  }
  onRefreshProducts(event: Array<ProductModel>) {
    console.log(event)
  }
  goBack(stepper: MatStepper) {
    this.stepper.previous();
  }
  goForward(stepper: MatStepper) {
    this.stepper.next();
  }
  onSave() {
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
