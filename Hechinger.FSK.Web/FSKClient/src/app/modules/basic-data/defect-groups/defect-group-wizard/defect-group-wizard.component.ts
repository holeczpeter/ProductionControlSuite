import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { ProductContext } from '../../../../models/generated/generated';
import { ProductDataService } from '../../../../services/data/product-data.service';
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
  product: ProductContext;
  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('mystepper') stepper: MatStepper;
  totalStepsCount!: 3;
  constructor(private readonly dialogRef: MatDialogRef<DefectGroupWizardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly productDataService: ProductDataService,
    public productContextService: ProductContextService,
    private readonly snackBar: SnackbarService,
    private readonly changeDetector: ChangeDetectorRef,
    public languageService: LanguageService) {
    this.title = this.data > 0 ? "defectgroups.edit" : "defectgroups.add";
  }

  ngOnInit(): void {
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
