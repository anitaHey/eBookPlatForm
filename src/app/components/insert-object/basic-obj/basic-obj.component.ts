import { Component, Input, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop/drag-events';
import { PaperManagementService } from 'src/app/services/paper-management.service';

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

  private minWidth!: number;
  private maxWidth!: number;
  private minHeight!: number;
  private maxHeight!: number;
  private screenX!: number;
  private screenY!: number;
  private translateX !: number;
  private translateY !: number;

  private mouseUpListener!: () => void;
  private mouseMoveListener!: () => void;

  constructor(private element: ElementRef, private renderer: Renderer2, private paperManagementService: PaperManagementService) {
    this.allHandleName = ['resize-s', 'resize-e', 'resize-se', 'resize-sw', 'resize-w', 'resize-nw', 'resize-n', 'resize-ne'];

    this.renderer.listen(element.nativeElement, 'click', (event) => {
      this.paperManagementService.setCurrentFocusObj(this);
      this.showResize = true;
    });
  }

  ngOnInit(): void {
    this.paperClass = ".paper[data-page='" + this.page + "']";
  }

  setInitData(evt: MouseEvent) {
    this.screenX = evt.clientX;
    this.screenY = evt.clientY;

    const thisComputedStyle = window.getComputedStyle(this.element.nativeElement);
    const parentComputedStyle = window.getComputedStyle(<Element>document.querySelector(this.paperClass));
    this.minWidth = parseFloat(thisComputedStyle.minWidth);
    this.maxWidth = parseFloat(parentComputedStyle.width);
    this.minHeight = parseFloat(thisComputedStyle.minHeight);
    this.maxHeight = parseFloat(parentComputedStyle.height);
  }

  updateDragPosition(evt: CdkDragEnd) {
    this.translateX = evt.source.getFreeDragPosition().x;
    this.translateY = evt.source.getFreeDragPosition().y;
  }

  removeFocus() {
    this.showResize = false;
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
    } else if (node.classList.contains("object") && !node.classList.contains("object_focus")){
      this.renderer.addClass(node, "object_focus");
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
      diffTopValue = 0;
    }

    if (currentWidthValue <= 1) {
      diffLeftValue = 0;
    }

    let currentTopValue = this.curY + diffTopValue;
    let currentLeftValue = this.curX + diffLeftValue;

    if(currentTopValue + this.translateY < 0) {
      currentTopValue = -this.translateY;
    }

    if(currentLeftValue + this.translateX < 0) {
      currentLeftValue = -this.translateX;
    }

    if (currentWidthValue <= 0) {
      currentWidthValue = 0;
    } else if(currentWidthValue > this.maxWidth) {
      currentWidthValue = this.maxWidth;
    } else if(currentWidthValue + currentLeftValue + this.translateX > this.maxWidth) {
      currentWidthValue = this.maxWidth - this.translateX - currentLeftValue;
    }

    if (currentHeightValue <= 0) {
      currentHeightValue = 0;
    } else if(currentHeightValue > this.maxHeight) {
      currentHeightValue = this.maxHeight;
    } else if(currentHeightValue + currentTopValue + this.translateY > this.maxHeight) {
      currentHeightValue = this.maxHeight - this.translateY - currentTopValue;
    }

    this.curY = currentTopValue;
    this.curX = currentLeftValue;
    this.curWidth = currentWidthValue;
    this.curHeight = currentHeightValue;

    this.screenX = evt.clientX;
    this.screenY = evt.clientY;
  }
}
