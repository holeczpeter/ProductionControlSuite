import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { ApplicationInfo, HelpCenter } from '../../models/generated/generated';
import { ApplicationService } from '../../services/data/application.service';
import { DocumentService } from '../../services/data/document.service';
import { FileDataService } from '../../services/data/file-data.service';

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
  pdfUrl : any;
  currentFilename: string;
  constructor(private readonly dialogRef: MatDialogRef<HelpCenterComponent>,
    private readonly applicationService: ApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentDataService: DocumentService,
    private fileService: FileDataService,
    private readonly domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.title = "help";
    forkJoin(this.applicationService.getApplicationInfo(),
      this.documentDataService.getUserManual(),
      this.applicationService.getHelpCenterInfo()).subscribe(([appInfo,userManual, helpCenterinfo]) => {
        this.applicationInformation = appInfo;
        this.helpCenterInformation = helpCenterinfo;
        if (userManual.body) {
          console.log(userManual.body)
          this.currentFilename = decodeURIComponent(userManual.headers.get('content-disposition').split(';')[2].split('filename')[1].split('=')[1].slice(7).trim());
          this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(userManual.body));
          console.log(this.currentFilename);
          console.log(this.pdfUrl)
        }
      
    });
  }
  
  
  onCancel() {
    this.dialogRef.close(false);
  }
}
