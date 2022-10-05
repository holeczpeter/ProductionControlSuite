import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCancelService {
  private pendingHTTPRequests$ = new Subject<void>();
  constructor(private spinnerserice: SpinnerService) { }

  public cancelPendingRequests() {
    this.pendingHTTPRequests$.next();
    this.spinnerserice.hide();
  }

  public onCancelPendingRequests() {
    return this.pendingHTTPRequests$.asObservable();
  }
}
