import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-insert-area',
  templateUrl: './document-insert-area.component.html',
  styleUrls: ['./document-insert-area.component.css']
})
export class DocumentInsertAreaComponent implements OnInit {
  @Output() chooseClose = new EventEmitter();
  @Output() chooseOpen = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  show(): void {
    this.chooseOpen.emit();
  }

  noshow(): void {
    this.chooseClose.emit();
  }
}
