import { BasicObjComponent } from './../components/insert-object/basic-obj/basic-obj.component';
import { OnDestroy, Directive, AfterViewInit, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

export interface ResizableEvent {
  width: number;
  height: number;
  event?: MouseEvent | Touch;
  direction?: 'horizontal' | 'vertical';
}

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective implements OnDestroy, AfterViewInit {
  @Output() resizeBegin: EventEmitter<any> = new EventEmitter();
  @Output() resizing: EventEmitter<ResizableEvent> = new EventEmitter();
  @Output() resizeEnd: EventEmitter<ResizableEvent> = new EventEmitter();

  element: HTMLElement;
  currentCom: BasicObjComponent;
  private subscription!: Subscription;
  private newWidth!: number;
  private newHeight!: number;
  private newLeft!: number;
  private newTop!: number;

  private minWidth!: number;
  private maxWidth!: number;
  private minHeight!: number;
  private maxHeight!: number;

  private startResize: boolean = false;

  private allHandleNode!: Array<HTMLSpanElement>;
  // private startResize: boolean = false;

  constructor(element: ElementRef, currentCom:BasicObjComponent ) {
    this.element = element.nativeElement;
    this.currentCom = currentCom;
  }

  ngAfterViewInit(): void {
    const thisComputedStyle = window.getComputedStyle(this.element);
    const parentComputedStyle = window.getComputedStyle(<Element>document.querySelector(this.currentCom.paperClass));
    this.minWidth = parseFloat(thisComputedStyle.minWidth);
    this.maxWidth = parseFloat(parentComputedStyle.width);
    this.minHeight = parseFloat(thisComputedStyle.minHeight);
    this.maxHeight = parseFloat(parentComputedStyle.height);

    for(var num = 0; num < 8; num++)
      this.allHandleNode.push(<HTMLSpanElement>this.element.querySelectorAll(".handleNode")[num]);
  }

  ngOnDestroy(): void {
    this.destroySubscription();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMousedown(event: MouseEvent | TouchEvent): void {
    if(!this.currentCom.showResize) {
      this.currentCom.showResize = true;
      this.resizeBegin.emit();
    }
  }

  private destroySubscription(): void {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  handleOnMouseDown(event: MouseEvent | TouchEvent) {
    this.startResize = true;
  }

  handleOnMouseMove(event: MouseEvent | TouchEvent) {
    if(this.startResize) {
      console.log("a");
    }
  }

  handleOnMouseUp(event: MouseEvent | TouchEvent) {
    this.startResize = false;
  }
}
