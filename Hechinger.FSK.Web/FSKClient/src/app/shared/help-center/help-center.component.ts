import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationInfo } from '../../models/generated/generated';
import { ApplicationService } from '../../services/data/application.service';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
  title: string;
  applicationInformation: ApplicationInfo;
  imageSrc = 'assets/images/logo.png';
  applicationAdministratorName = "Farkas Aleaxandra";
  applicationAdministratorEmail =  "a.farkas@hechinger-hungary.hu";
  systemAdministratorName = "Pesti Rajmund";
  systemAdministratorEmail =  "r.pesti@hechinger-hungary.hu";
  developerName = "Holecz Péter";
  developerEmail =  "h-peter@hechinger-hungary.hu";
  constructor(private readonly dialogRef: MatDialogRef<HelpCenterComponent>,
    private readonly applicationService: ApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.title = "help";
    this.applicationService.get().subscribe(appInfo => {
      this.applicationInformation = appInfo;
    });
    

  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
