import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { ApplicationInfo, HelpCenter } from '../../models/generated/generated';
import { ApplicationService } from '../../services/data/application.service';
import { DocumentService } from '../../services/data/document.service';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit, OnDestroy {
  title: string;
  applicationInformation: ApplicationInfo;
  helpCenterInformation: HelpCenter;
  imageSrc = 'assets/images/logo.png';
  pdfUrl : any;
  currentFilename: string;
  protected _onDestroy$ = new Subject<void>();

  constructor(private readonly dialogRef: MatDialogRef<HelpCenterComponent>,
    private readonly applicationService: ApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentDataService: DocumentService,
    private readonly domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.title = "help";
    forkJoin(this.applicationService.getApplicationInfo(),
      this.documentDataService.getUserManual(),
      this.applicationService.getHelpCenterInfo())
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(([appInfo, userManual, helpCenterinfo]) => {
        this.applicationInformation = appInfo;
        this.helpCenterInformation = helpCenterinfo;
        if (userManual.body) {
          this.currentFilename = decodeURIComponent(userManual.headers.get('content-disposition').split(';')[2].split('filename')[1].split('=')[1].slice(7).trim());
          this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(userManual.body));
        }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
