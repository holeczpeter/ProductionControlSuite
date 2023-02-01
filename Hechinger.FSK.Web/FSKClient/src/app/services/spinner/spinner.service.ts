import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  visibility$ = new BehaviorSubject(false);
  enabled$ = new BehaviorSubject(true);
  constructor() {
  }

  show(): void {
    this.visibility$.next(true);
  }

  hide(): void {
    this.visibility$.next(false);
  }
  enable(): void {
    this.enabled$.next(true);
  }
  disable(): void {
    this.enabled$.next(false);
  }
}
