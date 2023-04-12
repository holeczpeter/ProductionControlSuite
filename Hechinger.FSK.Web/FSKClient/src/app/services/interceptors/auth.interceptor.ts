import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AccountService } from '../account.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { ResultBuilder } from '../result/result-builder';
import { TokenRequestModel } from '../../models/generated/generated';

@Injectable()

 export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private accountService: AccountService, private snackBarService: SnackbarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.accountService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !authReq.url.includes('Token/Refresh')) {
        return this.handle401Error(req, next);
      }
      this.snackBarService.open(new ResultBuilder().setSuccess(false).setMessage("A művelet során hiba történt").build());

      throw new Error(JSON.stringify(error));
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.accountService.getRefreshToken();

      if (token)
        return this.accountService.refreshToken().pipe(
          switchMap((token: TokenRequestModel) => {
            this.isRefreshing = false;

            this.accountService.saveToken(token.token, token.refreshToken);
            this.refreshTokenSubject.next(token.token);

            return next.handle(this.addTokenHeader(request, token.token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.snackBarService.open(new ResultBuilder().setSuccess(false).setMessage("Az Ön munkamenete lejárt").build());
            this.accountService.logout();
            throw new Error(JSON.stringify(err));
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set("Authorization", `Bearer ${token}`) });
  }
}


