import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCancelService {
  public pendingHTTPRequests$ = new Subject<void>();
  constructor(private spinnerserice: SpinnerService) { }

  public cancelPendingRequests() {
    this.pendingHTTPRequests$.next();
    this.pendingHTTPRequests$.complete();
    this.spinnerserice.hide();
  }

  public onCancelPendingRequests() {
    return this.pendingHTTPRequests$.asObservable();
  }
}
