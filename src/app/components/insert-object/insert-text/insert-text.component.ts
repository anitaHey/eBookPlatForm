import { Component, OnInit, ElementRef, Renderer2, Inject } from '@angular/core';
import { BasicObjComponent } from '../basic-obj/basic-obj.component';
import { PaperManagementService } from 'src/app/services/paper-management.service';

@Component({
  selector: 'app-insert-text',
  templateUrl: './insert-text.component.html',
  styleUrls: ['./insert-text.component.css']
})
export class InsertTextComponent extends BasicObjComponent implements OnInit {

  constructor(private node_element: ElementRef, private node_renderer: Renderer2, private node_paperManagementService: PaperManagementService) {
    super(node_element, node_renderer, node_paperManagementService);
    // node_renderer.listen(node_element.nativeElement, 'click', (event) => {
    //   console.log("child: "+node_element);
    // });
  }

  ngOnInit(): void {
  }

}
