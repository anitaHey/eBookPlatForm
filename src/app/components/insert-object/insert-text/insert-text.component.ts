import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { BasicObjComponent } from '../basic-obj/basic-obj.component';
import { PaperManagementService } from 'src/app/services/paper-management.service';
import { InsertWordComponent } from '../insert-word/insert-word.component';
import { FontManagementService } from 'src/app/services/font-management.service';

@Component({
  selector: 'app-insert-text',
  templateUrl: './insert-text.component.html',
  styleUrls: ['./insert-text.component.css']
})
export class InsertTextComponent extends BasicObjComponent implements OnInit, AfterViewInit {
  model = '123';
  input_state: number = 1;
  currentRange: Range = document.createRange();
  caretPosition!: any;
  rangeContainer: Array<Node> = [];
  rangeNum: number = 0;
  isEnter: boolean = false;

  constructor(private injector: Injector, private applicationRef: ApplicationRef, private CFR: ComponentFactoryResolver, private node_element: ElementRef
    , private node_renderer: Renderer2, private node_paperManagementService: PaperManagementService, private fontService: FontManagementService) {
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

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'mouseup', (event) => {
      // this.getCaretCharacterOffsetWithin(this.node_element.nativeElement.querySelector(".text_node"));
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'compositionstart', (event) => {
      this.input_state = 0;
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'compositionend', (event) => {
      this.input_state = 1;
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'selectionchange', (event) => {
      // console.log(window.getSelection()?.getRangeAt(0));
      // console.log(window.getSelection());
      // this.getCaretCharacterOffsetWithin(this.node_element.nativeElement.querySelector(".text_node"));
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'keypress', (event) => {
      if (this.input_state == 1 && event.keyCode == 13) {
        this.isEnter = true;
        // event.preventDefault();
        // event.stopPropagation();
      }
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'keyup', (event) => {
      if (this.input_state == 1 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 229) {
        let num = this.getCaretCharacterOffsetWithin(this.node_element.nativeElement.querySelector(".text_node"));
        let node = (event.target as Element);
        let child = Array.from(node.childNodes);

        node.innerHTML = "";
        this.addNode(child, node);

        this.setCurrentOffset(node, num);
      }
    });
  }

  addNode(child: ChildNode[], parent: Element) {
    let new_div = document.createElement("div");
    let add = false;
    for (let tem of child) {
      if (tem.nodeName.includes("DIV")) {
        if (add) {
          parent.appendChild(new_div);
          add = false;
        }
        this.addNode(Array.from(tem.childNodes), parent);
      } else {
        add = true;
        if (tem.nodeName.includes("text") && tem.nodeValue != null)
          for (var n of tem.nodeValue) this.createSpan(n, new_div);
        else if (tem.nodeName == "SPAN") {
          if ((tem as HTMLElement).innerText.length >= 1)
            for (var n of (tem as HTMLElement).innerText) this.createSpan(n, new_div);
          else new_div.appendChild(tem);
        }
      }
    }

    if (add) {
      parent.appendChild(new_div);
      add = false;
    }

  }

  createSpan(text: string, parentNode: ChildNode) {
    let child = document.createElement("span");
    child.innerHTML = text;
    child.style.cssText = "font-family: " + this.fontService.getCurrentFamily() + ";color: " + this.fontService.getCurrentColor() + ";font-size: " + this.fontService.getCurrentSize() + "px;";

    parentNode.appendChild(child);
  }

  getCaretCharacterOffsetWithin(element: Element) {
    let start = 0;
    let end = 0;

    if (window.getSelection() != null) {
      let sel = window.getSelection();
      if (sel != null && sel.rangeCount > 0) {
        let range = window.getSelection()!.getRangeAt(0);
        this.caretPosition = window.getSelection()?.getRangeAt(0);

        let preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        start = preCaretRange.toString().length;
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        end = preCaretRange.toString().length;

        this.rangeContainer = [element, range.endContainer];
        this.rangeNum = start;
      }
    }

    return start;
  }

  setCurrentOffset(parent: Element, startNum: number) {
    if (window.getSelection() != null) {
      let container = this.getNewInsertNode(parent, 0, startNum - 1);
      let start = 1;
      let end = 1;

      if (this.isEnter) {
        end = 0;
        container = (container as Element).parentElement?.nextElementSibling;
        this.isEnter = false;
      }

      this.caretPosition.selectNodeContents(parent);
      this.caretPosition.setStart(container, start);
      this.caretPosition.setEnd(container, end);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(this.caretPosition);
    }
  }

  getNewInsertNode(node: Element, count: number, num: number): any {
    let list = node.childNodes;
    let node_child = Array.from(list);
console.log(num);
    for (let tem of node_child) {
      // console.log(tem.nodeName);
      if (tem.nodeName != "DIV" && count == num) return tem;
      else if (tem.nodeName == "SPAN") count++;
      else if (tem.nodeName == "DIV") {
        // console.log(tem.childNodes.length);
        // console.log((num-count));
        if (tem.childNodes.length >= (num - count)) {

          return this.getNewInsertNode((tem as Element), count, num);
        }
        else count += tem.childNodes.length;
      }
    }
  }
}
