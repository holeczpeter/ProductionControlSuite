import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';
import { HttpCancelService } from '../http-cancel.service';
import { ActivationEnd, Router } from '@angular/router';

@Injectable()
export class CancelHttpInterceptor implements HttpInterceptor {

  constructor(router: Router, private httpCancelService: HttpCancelService) {
    router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.httpCancelService.cancelPendingRequests();
      }
    });
  }
  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const modifiedReq = req.clone();
    return next.handle(modifiedReq).pipe(
      takeUntil(this.httpCancelService.onCancelPendingRequests()))
  }
}
