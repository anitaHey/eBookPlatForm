import { Component, Input, OnInit, ComponentRef, Renderer2, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { min } from 'rxjs/operators';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-basic-obj',
  templateUrl: './basic-obj.component.html',
  styleUrls: ['./basic-obj.component.css']
})
export class BasicObjComponent implements OnInit {
  @Input() type!: string;
  @Input() page !: number;
  @Input() paperClass !: string;
  @Input() parentClass !: string;
  @Input() dragDisabled: boolean = false;
  @Input() canResize: boolean = true;
  @Input() showResize: boolean = false;

  @Input() curWidth: number = 150;
  @Input() curHeight: number = 100;
  @Input() curX: number = 0;
  @Input() curY: number = 0;

  allHandleName: string[];
  element: ElementRef;
  renderer: Renderer2;

  private minWidth!: number;
  private maxWidth!: number;
  private minHeight!: number;
  private maxHeight!: number;
  private screenX!: number;
  private screenY!: number;

  private mouseUpListener!: () => void;
  private mouseMoveListener!: () => void;


  constructor(elementRef: ElementRef, renderer: Renderer2) {
    this.allHandleName = ['resize-s', 'resize-e', 'resize-se', 'resize-sw', 'resize-w', 'resize-nw', 'resize-n', 'resize-ne'];
    this.element = elementRef;
    this.renderer = renderer;

    this.renderer.listen(elementRef.nativeElement, 'click', (event) => {
      this.showResize = true;
    });
  }

  ngOnInit(): void {
    this.paperClass = ".paper[data-page='" + this.page + "']";
  }

  // setElementSize(event: MouseEvent | TouchEvent) {
  //   const thisComputedStyle = window.getComputedStyle(this.element.nativeElement);
  //   const parentComputedStyle = window.getComputedStyle(<Element>document.querySelector(this.paperClass));
  //   this.minWidth = parseFloat(thisComputedStyle.minWidth);
  //   this.maxWidth = parseFloat(parentComputedStyle.width);
  //   this.minHeight = parseFloat(thisComputedStyle.minHeight);
  //   this.maxHeight = parseFloat(parentComputedStyle.height);
  // }

  setInitData(evt: MouseEvent) {
    this.screenX = evt.clientX;
    this.screenY = evt.clientY;
  }

  @HostListener('mouseover', ['$event'])
  public onMouseOver(evt: MouseEvent): void {
    let node = (evt.target as Element);
    if (node.classList.contains("handleNode")) {
      this.dragDisabled = true;
    } else {
      this.dragDisabled = false;
    }
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    let node = (evt.target as Element);

    if (node.classList.contains("handleNode")) {
      this.setInitData(evt);
      this.mouseUpListener = this.renderer.listen('document', 'mouseup', event => this.handleOnMouseUp(event, (node.getAttribute("dir") == null ? "" : node.getAttribute("dir") as string)));
      this.mouseMoveListener = this.renderer.listen('document', 'mousemove', event => this.handleOnMouseMove(event, (node.getAttribute("dir") == null ? "" : node.getAttribute("dir") as string)));
    }
  }

  handleOnMouseMove(evt: MouseEvent, node_name: string) {
    this.generateValuesForEvent(evt, node_name);
  }

  handleOnMouseUp(evt: MouseEvent, node_name: string) {
    this.generateValuesForEvent(evt, node_name);
    if (this.mouseMoveListener)  this.mouseMoveListener();
    if (this.mouseUpListener)  this.mouseUpListener();
  }

  generateValuesForEvent(evt: MouseEvent, node_name: string) {
    let diffWidthValue = evt.clientX - this.screenX;
    let diffHeightValue = evt.clientY - this.screenY;
    let diffTopValue = diffHeightValue;
    let diffLeftValue = diffWidthValue;

    switch (node_name) {
      case "resize-n": {
        diffHeightValue *= -1;
        diffWidthValue = 0;
        diffLeftValue = 0;
        break;
      }
      case "resize-ne": {
        diffHeightValue *= -1;
        diffLeftValue = 0;
        break;
      }
      case "resize-e": {
        diffHeightValue = 0;
        diffTopValue = 0;
        diffLeftValue = 0;
        break;
      }
      case "resize-se": {
        diffTopValue = 0;
        diffLeftValue = 0;
        break;
      }
      case "resize-s": {
        diffWidthValue = 0;
        diffLeftValue = 0;
        diffTopValue = 0;
        break;
      }
      case "resize-sw": {
        diffWidthValue *= -1;
        diffTopValue = 0;
        break;
      }
      case "resize-w": {
        diffWidthValue *= -1;
        diffHeightValue = 0;
        diffTopValue = 0;
        break;
      }
      case "resize-nw": {
        diffHeightValue *= -1;
        diffWidthValue *= -1;
        break;
      }
    }

    let currentWidthValue = this.curWidth + diffWidthValue;
    let currentHeightValue = this.curHeight + diffHeightValue;

    if (currentHeightValue <= 1) {
      diffTopValue += currentHeightValue;
    }

    if (currentWidthValue <= 1) {
      diffLeftValue += currentWidthValue;
    }

    if (currentWidthValue <= 0) {
      currentWidthValue = 0;
    }

    if (currentHeightValue <= 0) {
      currentHeightValue = 0;
    }

    let currentTopValue = this.curY + diffTopValue;
    let currentLeftValue = this.curX + diffLeftValue;

    this.curY = currentTopValue;
    this.curX = currentLeftValue;
    this.curWidth = currentWidthValue;
    this.curHeight = currentHeightValue;

    this.screenX = evt.clientX;
    this.screenY = evt.clientY;
  }
}
