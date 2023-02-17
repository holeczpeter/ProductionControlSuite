import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ApplicationInfo, HelpCenter } from '../../models/generated/generated';
import { ApplicationService } from '../../services/data/application.service';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
  title: string;
  applicationInformation: ApplicationInfo;
  helpCenterInformation: HelpCenter;
  imageSrc = 'assets/images/logo.png';
 
  constructor(private readonly dialogRef: MatDialogRef<HelpCenterComponent>,
    private readonly applicationService: ApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.title = "help";
    forkJoin(this.applicationService.getApplicationInfo(), this.applicationService.getHelpCenterInfo()).subscribe(([appInfo,helpCenterinfo]) => {
      this.applicationInformation = appInfo;
      this.helpCenterInformation = helpCenterinfo;
      console.log(this.helpCenterInformation)
    });
    

  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
