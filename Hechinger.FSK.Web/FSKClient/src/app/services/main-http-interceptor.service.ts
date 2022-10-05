import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { AccountService } from './account.service';
import { HttpCancelService } from './http-cancel.service';
import { SnackbarService } from './snackbar/snackbar.service';
import { SpinnerService } from './spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class MainHttpInterceptorService implements HttpInterceptor {
  private currentRequests: number;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private readonly accountService: AccountService,
    private spinnerService: SpinnerService,
    router: Router,
    private httpCancelService: HttpCancelService,
    private snackBarService: SnackbarService) {
    this.currentRequests = 0;
    router.events.subscribe(event => {
      if (event instanceof ActivationEnd) this.httpCancelService.cancelPendingRequests();
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //this.incrementRequestCount();
    //let authReq = request;
    //const token = this.accountService.getToken();
    //if (token != null) {
    //  authReq = this.addTokenHeader(request, token);
    //}
    return next.handle(request)
  }
  //  return next.handle(authReq)
  //    .pipe(
  //      tap((event: HttpEvent<any>) => {
  //        if (event.type === HttpEventType.UploadProgress) {
  //          const progressValue = Math.round((100 * event.loaded) / event.total);
  //          let propressPercent = progressValue + " %";
  //          if (progressValue === 100) {
  //            setTimeout(() => {
  //              propressPercent = "Feltöltve";
  //            }, 0);
  //            setTimeout(() => {
  //              propressPercent = "Feltöltve";
  //            }, 2000);
  //          }
  //        }
  //        if (event instanceof HttpResponse) {
  //          this.decrementRequestCount();
  //        }

  //      }, (error) => {
  //        this.currentRequests = 0;
  //        this.spinnerService.hide();
  //      })
  //      , catchError((x: HttpErrorResponse) => {
  //        if (x.status === 401 && !authReq.url.includes('Token/Refresh')) {
  //          return this.handle401Error(request, next);
  //        }
  //        let error = {
  //          message: x.message,
  //          status: x.status
  //        };
  //        this.currentRequests = 0;
  //        this.spinnerService.hide();
  //        this.snackBarService.open(new ApiResultBuilder().setSuccess(false).setMessage("A művelet során hiba történt").build());

  //        throw new Error(JSON.stringify(error));
  //      })
  //    );
  //}

  //private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //  if (!this.isRefreshing) {
  //    this.isRefreshing = true;
  //    this.refreshTokenSubject.next(null);


  //    return this.accountService.refreshToken().pipe(
  //      switchMap((x: RefreshTokenModel) => {
  //        this.isRefreshing = false;

  //        this.accountService.saveToken(x.token, x.refreshToken);
  //        this.refreshTokenSubject.next(x.token);

  //        return next.handle(this.addTokenHeader(request, x.token));
  //      }),
  //      catchError((err) => {
  //        this.isRefreshing = false;

  //        this.accountService.logout();
  //        throw new Error(JSON.stringify(err));
  //      }))
  //  }

  //  return this.refreshTokenSubject.pipe(
  //    filter(token => token !== null),
  //    take(1),
  //    switchMap((token) => next.handle(this.addTokenHeader(request, token)))
  //  );
  //}

  //private addTokenHeader(request: HttpRequest<any>, token: string) {
  //  return request.clone({ headers: request.headers.set("Authorization", `Bearer ${token}`) });
  //}

  //private decrementRequestCount(): void {
  //  if (--this.currentRequests === 0) this.spinnerService.hide();
  //}

  //private incrementRequestCount(): void {
  //  if (this.currentRequests++ === 0) this.spinnerService.show();
  //}
}
