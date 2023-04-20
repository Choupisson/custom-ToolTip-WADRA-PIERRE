import { Directive, ElementRef, HostListener, Input, Renderer2, AfterContentInit, ContentChild } from '@angular/core';

@Directive({
  selector: '[customTooltip]'
})
export class CustomTooltipDirective implements AfterContentInit {
  @Input('customTooltip') position: 'top' | 'bottom' | 'left' | 'right' | '' = 'top';

  @ContentChild('customTooltipContent') contentElement?: ElementRef;
  private tooltipElement?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

    //quand on rentre
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    this.showTooltip();
  }
  //quand on sort
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
    //Récupère le contenu HTML de l'élément de contenu
    const tooltipContent = this.contentElement.nativeElement.innerHTML;

    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipElement, 'custom-tooltip');
    this.renderer.setProperty(this.tooltipElement, 'innerHTML', tooltipContent);
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    let top, left;
    
    // Vérifie si l'élément de la bulle d'aide existe
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

      // Pour assurer que ça sort pas de la fenêtre sinon pas beau
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const tooltipRect = this.tooltipElement.getBoundingClientRect();

      if (tooltipRect.right > viewportWidth) {
        left -= tooltipRect.right - viewportWidth;
      }
      if (tooltipRect.left < 0) {
        left -= tooltipRect.left;
      }
      if (tooltipRect.bottom > viewportHeight) {
        top -= tooltipRect.bottom - viewportHeight;
      }
      if (tooltipRect.top < 0) {
        top -= tooltipRect.top;
      }

      this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);

      this.renderer.appendChild(document.body, this.tooltipElement);
    }
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = undefined;
    }
  }
}
