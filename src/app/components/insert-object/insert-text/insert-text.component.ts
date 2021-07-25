import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { BasicObjComponent } from '../basic-obj/basic-obj.component';
import { PaperManagementService } from 'src/app/services/paper-management.service';
import { FontManagementService } from 'src/app/services/font-management.service';
import { SelectManagementService } from 'src/app/services/select-management.service';

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

  constructor(private node_element: ElementRef, private node_renderer: Renderer2, private node_paperManagementService: PaperManagementService
    , private fontService: FontManagementService, private selectManagement: SelectManagementService) {
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
      var sel = window.getSelection();
      if(sel != null && sel.toString().length > 0) {
        let node_list = sel.getRangeAt(0).cloneContents().childNodes;
        this.selectManagement.setSelectedContent(node_list);
        this.selectManagement.setSelectedRange(sel.getRangeAt(0));
        let first_div = sel.getRangeAt(0).startContainer.parentNode?.parentNode;
        let last_div = sel.getRangeAt(0).endContainer.parentNode?.parentNode;
        this.selectManagement.setSelectTextDiv([first_div as Node, last_div as Node]);
        let fir_b = first_div?.firstChild?.isSameNode(sel.getRangeAt(0).startContainer.parentNode) || false;
        let last_b = last_div?.lastChild?.isSameNode(sel.getRangeAt(0).endContainer.parentNode) || false;
        this.selectManagement.setSelectTextIsNewLine([fir_b, last_b]);

        let cur_family = "";
        let isSame = true;
        for (let i = 0; i < node_list.length; i++) {
          if((node_list[i] as HTMLSpanElement).nodeName == "DIV") {
            let child = Array.from(node_list[i].childNodes);
            for(let n = 0; n < child.length; n++) {
              if(cur_family == "")
                cur_family = this.fontService.removeQuotes((child[n] as HTMLSpanElement).style.fontFamily);
              else if(cur_family != this.fontService.removeQuotes((child[n] as HTMLSpanElement).style.fontFamily)) {
                isSame = false;
                break;
              }
            }
          } else {
            if(cur_family == "")
              cur_family = this.fontService.removeQuotes((node_list[i] as HTMLSpanElement).style.fontFamily);
            else if(cur_family != this.fontService.removeQuotes((node_list[i] as HTMLSpanElement).style.fontFamily))
              isSame = false;
          }

          if(!isSame) {
            cur_family = " ";
            break;
          }
        }
        this.fontService.setTemFamily(cur_family);
      } else {
        this.singleSelectText(false);
      }
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'compositionstart', (event) => {
      this.input_state = 0;
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'compositionend', (event) => {
      this.input_state = 1;
    });

    this.node_renderer.listen(this.node_element.nativeElement.querySelector(".text_node"), 'keypress', (event) => {
      if (this.input_state == 1 && event.keyCode == 13) {
        this.isEnter = true;
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
        this.singleSelectText(true);
      } else {
        this.singleSelectText(false);
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
          for (var n of tem.nodeValue) this.createSpan(n, new_div, "");
        else if (tem.nodeName == "SPAN") {
          if ((tem as HTMLElement).innerText.length > 1){
            let cssText = (tem as HTMLElement).style.cssText;
            for (var n of (tem as HTMLElement).innerText) this.createSpan(n, new_div, cssText);
          } else if ((tem as HTMLElement).innerHTML == "<br>" || (tem as HTMLElement).innerText.length == 1) new_div.appendChild(tem);
        }
      }
    }

    if (add) {
      parent.appendChild(new_div);
      add = false;
    }

  }

  createSpan(text: string, parentNode: ChildNode, cssText: string) {
    let child = document.createElement("span");
    child.innerHTML = text;
    if(cssText.length == 0)
      child.style.cssText = "font-family: " + this.fontService.getCurrentFamily() + ";color: " + this.fontService.getCurrentColor() + ";font-size: " + this.fontService.getCurrentSize() + "px;";
    else
      child.style.cssText = cssText;
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
    for (let tem of node_child) {
      if (tem.nodeName != "DIV" && count == num) return tem;
      else if (tem.nodeName == "SPAN") count++;
      else if (tem.nodeName == "DIV") {
        if (tem.childNodes.length > (num - count)) {
          return this.getNewInsertNode((tem as Element), count, num);
        }
        else count += tem.childNodes.length;
      }
    }
  }

  singleSelectText(isKey: boolean) {
    var sel = window.getSelection();

    if(isKey) {
      if((sel?.getRangeAt(0).startContainer as HTMLSpanElement).style.fontFamily.length > 0) {
        this.fontService.setTemFamily(this.fontService.removeQuotes((sel?.getRangeAt(0).startContainer as HTMLSpanElement).style.fontFamily));
      }
    } else {
      if((sel?.getRangeAt(0).startContainer.parentNode as HTMLSpanElement).style.fontFamily.length > 0) {
        this.fontService.setTemFamily(this.fontService.removeQuotes((sel?.getRangeAt(0).startContainer.parentNode as HTMLSpanElement).style.fontFamily));
      }
    }

    this.selectManagement.setSelectedContent(null);
    this.selectManagement.setSelectedRange(null);
    this.selectManagement.setSelectTextDiv([]);
    this.selectManagement.setSelectTextIsNewLine([]);
  }
}
