import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, TemplateRef } from '@angular/core';
import { TooltipComponent } from '../shared/tooltip/tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() showToolTip: boolean = true;
  @Input(`customToolTip`) text: string;
  @Input() contentTemplate: TemplateRef<any>;

  private _overlayRef: OverlayRef;

  constructor(private _overlay: Overlay,
    private _overlayPositionBuilder: OverlayPositionBuilder,
    private _elementRef: ElementRef) { }

  ngOnInit() {

    if (!this.showToolTip) return;
    const positionStrategy = this._overlayPositionBuilder
      .flexibleConnectedTo(this._elementRef)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      }, {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
      },
      {
        originX: 'start',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'bottom',
      }]);
    this._overlayRef = this._overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show() {
    if (this._overlayRef && !this._overlayRef.hasAttached()) {
      const tooltipRef: ComponentRef<TooltipComponent> = this._overlayRef.attach(new ComponentPortal(TooltipComponent));
      tooltipRef.instance.text = this.text;
      tooltipRef.instance.contentTemplate = this.contentTemplate;
    }
  }

  @HostListener('mouseleave')
  hide() {
    this.closeToolTip();
  }

  ngOnDestroy() {
    this.closeToolTip();
  }

  private closeToolTip() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }
}
