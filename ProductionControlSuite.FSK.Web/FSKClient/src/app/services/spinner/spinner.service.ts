import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  visibility$ = new BehaviorSubject(false);
  enabled$ = new BehaviorSubject(true);
  private _currentRequests: number;
  get currentRequests(): number {
    return this._currentRequests;
  }

  set currentRequests(currentRequests: number) {
    this._currentRequests = currentRequests;
  }
  decrementRequestCount(): void {
    if (--this.currentRequests === 0 && this.enabled$.value) this.hide();
  }

  incrementRequestCount(): void {
    if (this.currentRequests++ === 0 && this.enabled$.value) this.show();
  }
  constructor() {
  }

  show(): void {
    this.visibility$.next(true);
  }

  hide(): void {
    this.currentRequests = 0;
    this.visibility$.next(false);
  }
  enable(): void {
    this.enabled$.next(true);
  }
  disable(): void {
    this.enabled$.next(false);
  }
}
