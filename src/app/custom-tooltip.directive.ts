import { Directive, ElementRef, HostListener, Input, Renderer2, AfterContentInit, ContentChild } from '@angular/core';

@Directive({
  selector: '[customTooltip]'
})
export class CustomTooltipDirective implements AfterContentInit {
  @Input('customTooltip') position: 'top' | 'bottom' | 'left' | 'right' | '' = 'top';
  @ContentChild('customTooltipContent') contentElement?: ElementRef;
  private tooltipElement?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    this.showTooltip();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.hideTooltip();
  }

  ngAfterContentInit() {
    if (this.contentElement) {
      this.renderer.setStyle(this.contentElement.nativeElement, 'display', 'none');
    }
  }

  private showTooltip() {
    if (!this.contentElement) {
      return;
    }
    const tooltipContent = this.contentElement.nativeElement.innerHTML;

    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipElement, 'custom-tooltip');
    this.renderer.setProperty(this.tooltipElement, 'innerHTML', tooltipContent);
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    let top, left;

    if (this.tooltipElement) {
      switch (this.position) {
        case 'top':
          top = hostRect.top - this.tooltipElement.offsetHeight;
          left = hostRect.left;
          break;
        case 'bottom':
          top = hostRect.bottom;
          left = hostRect.left;
          break;
        case 'left':
          top = hostRect.top;
          left = hostRect.left - this.tooltipElement.offsetWidth;
          break;
        case 'right':
          top = hostRect.top;
          left = hostRect.right;
          break;
      }

      this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);

      this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    }
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = undefined;
    }
  }
}

