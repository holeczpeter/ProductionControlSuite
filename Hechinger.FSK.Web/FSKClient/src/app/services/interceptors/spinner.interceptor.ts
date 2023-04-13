import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  
  constructor(private spinnerService: SpinnerService,
    router: Router) {
    this.spinnerService.currentRequests = 0;
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.incrementRequestCount();
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
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
          if (event instanceof HttpResponse) {
            this.spinnerService.decrementRequestCount();
          }

        }, (error) => {
          console.log(error)
          this.spinnerService.hide();
        })
      );
  }
}
