import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-document-main-area',
  templateUrl: './document-main-area.component.html',
  styleUrls: ['./document-main-area.component.css']
})
export class DocumentMainAreaComponent implements OnInit {
  @Input() min_width: string = "300px";
  @Input() changing!: Subject<string>;

  constructor() { }

  ngOnInit(): void {
    this.changing.subscribe(v => {
      this.min_width = v;
   });
  }

}
