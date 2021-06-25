import { Component, Input, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop/drag-events';
import { PaperManagementService } from 'src/app/services/paper-management.service';
import { ResizableEvent } from 'src/app/event/resizable-event';

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
  translateX : number = 0;
  translateY : number = 0;

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

  updateDragPosition(evt: CdkDragEnd) {
    this.translateX = evt.source.getFreeDragPosition().x;
    this.translateY = evt.source.getFreeDragPosition().y;
  }

  updateResize(evt: ResizableEvent) {
    this.curY = evt.y;
    this.curX = evt.x;
    this.curWidth = evt.width;
    this.curHeight = evt.height;
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
}
