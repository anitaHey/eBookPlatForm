import { Component, Input, OnInit, ComponentRef } from '@angular/core';

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
  @Input() dragDisabled : boolean = false;
  @Input() canResize : boolean = true;
  @Input() startResize : boolean = false;

  allHandleName: string[];
  constructor() {
    this.allHandleName = ['resize-handle-s', 'resize-handle-e', 'resize-handle-se', 'resize-handle-sw', 'resize-handle-w', 'resize-handle-nw', 'resize-handle-n', 'resize-handle-ne'];
   }

  ngOnInit(): void {
    this.paperClass = ".paper[data-page='"+ this.page +"']"
  }

}
