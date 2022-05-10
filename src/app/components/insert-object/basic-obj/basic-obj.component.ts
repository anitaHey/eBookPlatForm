import { Component, Input, OnInit, Renderer2, ElementRef, Output, TemplateRef, EventEmitter, AfterViewInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop/drag-events';
import { PaperManagementService } from 'src/app/services/paper-management.service';
import { ResizableEvent } from 'src/app/event/resizable-event';

@Component({
  selector: 'app-basic-obj',
  templateUrl: './basic-obj.component.html',
  styleUrls: ['./basic-obj.component.css']
})
export class BasicObjComponent implements OnInit, AfterViewInit {
  model = 'Initial value';
  @Input() type!: string;
  @Input() text!: string;
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
  @Input() templateRef!: TemplateRef<any>;

  allHandleName: string[];
  translateX: number = 0;
  translateY: number = 0;

  onMouseOver: Function;
  @Output() mouseOver: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(private element: ElementRef, private renderer: Renderer2, private paperManagementService: PaperManagementService) {
    this.allHandleName = ['resize-s', 'resize-e', 'resize-se', 'resize-sw', 'resize-w', 'resize-nw', 'resize-n', 'resize-ne'];

    this.renderer.listen(element.nativeElement, 'click', (event) => {
      this.paperManagementService.setCurrentFocusObj(this);
      this.showResize = true;
    });

    this.renderer.listen(element.nativeElement, 'mouseover', (event: MouseEvent) =>
      this.mouseOver.emit(event)
    );

    this.onMouseOver = function (evt: MouseEvent): void {
      let node = (evt.target as Element);
      if (node.classList.contains("handleNode")) {
        this.dragDisabled = true;
      } else {
        this.dragDisabled = false;
      }
    };
  }

  ngOnInit(): void {
    this.paperClass = ".paper[data-page='" + this.page + "']";
  }

  ngAfterViewInit() {
    this.renderer.listen(this.element.nativeElement.querySelector(".moveNode"), 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
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
}
