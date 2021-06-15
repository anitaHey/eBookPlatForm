import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-insert-area',
  templateUrl: './document-insert-area.component.html',
  styleUrls: ['./document-insert-area.component.css']
})
export class DocumentInsertAreaComponent implements OnInit {
  @Output() chooseOpen = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  show(type: string): void {
    this.chooseOpen.emit(type);
  }
}
