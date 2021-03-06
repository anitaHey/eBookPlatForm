import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FontManagementService } from 'src/app/services/text-services/font-management.service';

@Component({
  selector: 'app-document-style-area',
  templateUrl: './document-style-area.component.html',
  styleUrls: ['./document-style-area.component.css']
})
export class DocumentStyleAreaComponent implements OnInit {
  @Output() styleOpen = new EventEmitter<string>();
  currentFamily !: string;
  currentSize !: number;
  currentColor !: string;
  constructor(private fontService: FontManagementService) {
    this.currentFamily = fontService.getCurrentFamily();
    this.currentColor = fontService.getCurrentColor();
    this.currentSize = fontService.getCurrentSize();

    this.fontService.familyChanged$.subscribe(input => {
      this.currentFamily = input as string;
    });
  }

  ngOnInit(): void {
  }

  show(e: MouseEvent, type: string) {
    e.preventDefault();
    e.stopPropagation();

    this.styleOpen.emit();
  }
}
