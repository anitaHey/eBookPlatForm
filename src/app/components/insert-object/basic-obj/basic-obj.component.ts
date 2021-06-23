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
  private startResize: boolean = false;

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

  ngAfterViewInit(): void {
    let node = this.element.nativeElement.querySelectorAll('.handleNode');

    // this.renderer.listen(node[num], 'mouseup', (event) => {
    //   this.handleOnMouseUp(event, node[num].getAttribute("dir"));
    // });
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

  @HostListener('mousedown', ['$event'])
  public onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();

    let node = (evt.target as Element);
    if (node.classList.contains("handleNode")) {
      this.setInitData(evt);
      this.startResize = true;

      this.mouseUpListener = this.renderer.listen(evt.target, 'mouseup', event => this.handleOnMouseUp(event, (node.getAttribute("dir") == null ? "" : node.getAttribute("dir") as string)));
      this.mouseMoveListener = this.renderer.listen(evt.target, 'mousemove', event => this.handleOnMouseMove(event, (node.getAttribute("dir") == null ? "" : node.getAttribute("dir") as string)));
      this.renderer.addClass(evt.target, node.getAttribute("dir") as string);
      console.log(this.renderer.data);
    }
  }
  // handleOnMouseDown(event: MouseEvent | TouchEvent, node_name: string) {
  //   this.startResize = true;
  //   this.setElementSize(event);
  // }

  handleOnMouseMove(evt: MouseEvent, node_name: string) {
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

    // console.log(currentWidthValue);
    this.curY = currentTopValue;
    this.curX = currentLeftValue;
    this.curWidth = currentWidthValue;
    this.curHeight = currentHeightValue;
  }
  //   if(this.startResize) {
  //     const evt = this.getEvent(event);
  //     const movementX = evt.screenX - this.screenX;
  //     const movementY = evt.screenY - this.screenY;

  //     console.log(evt.screenX);
  //     console.log(this.screenX);

  //     let newW = this.curWidth - (node_name == "resize-sw" || node_name == "resize-w" || node_name == "resize-nw"? movementX : -movementX);
  //     let newH = this.curHeight - (node_name == "resize-nw" || node_name == "resize-n" || node_name == "resize-ne"? movementY : -movementY);
  //     let newX = this.curX + movementX;
  //     let newY = this.curY + movementY;

  //     let overMinHeight = !this.minHeight || newH >= this.minHeight;
  //     let underMaxHeight = !this.maxHeight || newH <= this.maxHeight;
  //     let overMinWidth = !this.minWidth || newW >= this.minWidth;
  //     let underMaxWidth = !this.maxWidth || newW <= this.maxWidth;

  //     if (overMinWidth && underMaxWidth) {
  //       if (node_name == "resize-se" || node_name == "resize-e" || node_name == "resize-ne"){
  //         this.curWidth = newW;
  //       }
  //       if (node_name == "resize-sw" || node_name == "resize-w" || node_name == "resize-nw"){
  //         this.curX = newX;
  //         this.curWidth = newW;
  //       }
  //     }

  //     if (overMinHeight && underMaxHeight) {
  //       if (node_name == "resize-se" || node_name == "resize-s" || node_name == "resize-sw"){
  //         this.curHeight = newH;
  //       }
  //       if (node_name == "resize-nw" || node_name == "resize-n" || node_name == "resize-ne"){
  //         this.curY = newY;
  //         this.curHeight = newH;
  //       }
  //     }
  //   }
  // }

  handleOnMouseUp(evt: MouseEvent, node_name: string) {
    // this.startResize = false;
    this.mouseMoveListener();
    this.mouseUpListener();
    this.renderer.removeClass(evt.target, (evt.target as Element).getAttribute("dir") as string);
    console.log(this.renderer.data);
  }
}
