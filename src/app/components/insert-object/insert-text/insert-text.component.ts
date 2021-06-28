import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { BasicObjComponent } from '../basic-obj/basic-obj.component';
import { PaperManagementService } from 'src/app/services/paper-management.service';

@Component({
  selector: 'app-insert-text',
  templateUrl: './insert-text.component.html',
  styleUrls: ['./insert-text.component.css']
})
export class InsertTextComponent extends BasicObjComponent implements OnInit, AfterViewInit  {
  model = 'Initial value';

  constructor(private node_element: ElementRef, private node_renderer: Renderer2, private node_paperManagementService: PaperManagementService) {
    super(node_element, node_renderer, node_paperManagementService);

    this.onMouseOver = function(evt: MouseEvent): void {
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
  }
}
