import {
    HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable, tap} from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  
  constructor(private spinnerService: SpinnerService,
    router: Router) {
    this.spinnerService.currentRequests = 0;
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.incrementRequestCount();
    let lastResponse: HttpEvent<any>;
    let error: HttpErrorResponse;
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          lastResponse = event;
          if (event.type === HttpEventType.UploadProgress) {
            const progressValue = event ? Math.round((100 * event.loaded) / event.total!) : 0;
            let propressPercent = progressValue + " %";
            if (progressValue === 100) {
              setTimeout(() => {
                propressPercent = "Feltöltve";
              }, 0);
              setTimeout(() => {
                propressPercent = "Feltöltve";
              }, 2000);
            }
          }
          if (lastResponse.type === HttpEventType.Response) {
            this.spinnerService.decrementRequestCount();
          }
        }, (error) => {
          console.log(error);
          this.spinnerService.hide();
        }),
        finalize(() => {
          if (lastResponse.type === HttpEventType.Sent && !error) {
            this.spinnerService.decrementRequestCount();
          }
        })
      );
  }
}
