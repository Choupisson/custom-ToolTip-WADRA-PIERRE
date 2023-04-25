import { Directive, ElementRef, Renderer2, Input, ContentChild, AfterViewInit, HostListener } from '@angular/core';


@Directive({
  selector: '[customToolTip]'
})
export class CustomToolTipDirective implements AfterViewInit {
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @ContentChild('customToolTipContent') customToolTipContent!: ElementRef;
  private toolTipWrapper!: HTMLElement;
  

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.toolTipWrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.toolTipWrapper, 'tooltip-wrapper');
    this.renderer.setStyle(this.toolTipWrapper, 'display', 'none');
    this.renderer.appendChild(this.toolTipWrapper, this.customToolTipContent.nativeElement);
    this.renderer.appendChild(this.el.nativeElement, this.toolTipWrapper);
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.renderer.setStyle(this.toolTipWrapper, 'display', 'block');
    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.toolTipWrapper.getBoundingClientRect();
    let top, left;

    switch (this.position) {
      case 'top':
        top = hostRect.top - tooltipRect.height;
        left = hostRect.left;
        break;
      case 'bottom':
        top = hostRect.bottom;
        left = hostRect.left;
        break;
      case 'left':
        top = hostRect.top;
        left = hostRect.left - tooltipRect.width;
        break;
      case 'right':
        top = hostRect.top;
        left = hostRect.right;
        break;
    }

    this.renderer.setStyle(this.toolTipWrapper, 'top', `${top}px`);
    this.renderer.setStyle(this.toolTipWrapper, 'left', `${left}px`);
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.renderer.setStyle(this.toolTipWrapper, 'display', 'none');
  }
}
