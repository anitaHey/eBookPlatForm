import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { BasicObjComponent } from '../basic-obj/basic-obj.component';
import { PaperManagementService } from 'src/app/services/paper-management.service';
import { InsertWordComponent } from '../insert-word/insert-word.component';

@Component({
  selector: 'app-insert-text',
  templateUrl: './insert-text.component.html',
  styleUrls: ['./insert-text.component.css']
})
export class InsertTextComponent extends BasicObjComponent implements OnInit, AfterViewInit {
  model = '123';
  input_state: number = 1;


  constructor(private injector: Injector, private applicationRef: ApplicationRef, private CFR: ComponentFactoryResolver, private node_element: ElementRef, private node_renderer: Renderer2, private node_paperManagementService: PaperManagementService) {
    super(node_element, node_renderer, node_paperManagementService);

    this.onMouseOver = function (evt: MouseEvent): void {
      let node = (evt.target as Element);
      if (node.classList.contains("handleNode") || node.classList.contains("text_node")) {
        this.dragDisabled = true;
      } else {
        this.dragDisabled = false;
      }
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'mousedown', (event) => {
      this.node_paperManagementService.setCurrentFocusObj(this);
      this.showResize = true;
      this.node_renderer.addClass(this.node_element.nativeElement.querySelector(".object"), "object_focus");

      event.stopPropagation();
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'compositionstart', (event) => {
      this.input_state = 0;
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'compositionend', (event) => {
      this.input_state = 1;
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'selectstart', (event) => {
      // console.log("aaa");
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'keyup', (event) => {
      if (this.input_state == 1 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 229) {
        // console.log((event.target as Element).removeChild((event.target as Element).childNodes[0]));
        let node = (event.target as Element);
        var node_child = node.childNodes;
        this.createSpan();
      }
    });
  }

  createSpan() {
    const caretPosition = window.getSelection()!.getRangeAt(0);
    const range = document.createRange();
    range.setStart(
      caretPosition.commonAncestorContainer,
      caretPosition.startOffset
    );
    range.setEnd(
      caretPosition.commonAncestorContainer,
      caretPosition.endOffset
    );
    const child = this.node_renderer.createElement("app-insert-word");
    const factory = this.CFR.resolveComponentFactory(InsertWordComponent);
    const cmp = factory.create(this.injector, [], child);

    this.applicationRef.attachView(cmp.hostView);
    cmp.instance.text = "1";

    range.insertNode(child);
    caretPosition.setStart(range.endContainer, range.endOffset);
    caretPosition.setEnd(caretPosition.endContainer, caretPosition.endOffset);
  }
}
