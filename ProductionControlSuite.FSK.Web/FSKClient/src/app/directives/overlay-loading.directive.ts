import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { SpinnerData } from '../models/spinner-data';
import { DynamicOverlayService } from '../services/spinner/dynamic-overlay.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Directive({
  selector: '[overlayLoading]'
})
export class OverlayLoadingDirective {
  @Input('overlayLoading') toggler!: Observable<boolean>;
  @Input() loaderData!: SpinnerData;
  @Input() onDestroy$!: Observable<any>;
  private overlayRef: OverlayRef | undefined;

  constructor(
    private readonly host: ElementRef,
    private readonly dynamicOverlay: DynamicOverlayService,
    private readonly parentInjector: Injector,
  ) { }

  ngOnInit() {
    
    setTimeout(() => {
      this.toggler.pipe(takeUntil(this.onDestroy$)).subscribe(show => {

        const existingDialogOverlays = document.querySelectorAll(`[id^="mat-dialog-"]`)
        let existingDialogOverlay = existingDialogOverlays.item(0);
        if (!this.overlayRef) {
          this.overlayRef = this.dynamicOverlay.createWithDefaultConfig(existingDialogOverlay != null ? existingDialogOverlay : this.host.nativeElement);
        }

        if (show) {
          if (!this.overlayRef!.hasAttached()) {
            const injector = this.getInjector(this.loaderData, this.parentInjector);
            const loaderPortal = new ComponentPortal(
              LoaderComponent,
              null,
              injector
            );
            this.overlayRef!.attach(loaderPortal);
          }
        } else {
          this.overlayRef!.detach();
          this.overlayRef!.dispose();
          this.overlayRef = undefined;
        }
      });
    });
  }

  getInjector(data: SpinnerData, parentInjector: Injector): PortalInjector {
    const tokens = new WeakMap();
    tokens.set(SpinnerData, data);
    return new PortalInjector(parentInjector, tokens);
  }
}
