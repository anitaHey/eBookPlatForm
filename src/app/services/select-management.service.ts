import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectManagementService {
  selectedContent!: any;
  selectedRange!: Range | null;
  constructor() { }

  setSelectedContent(input: any) {
    this.selectedContent = input;
  }

  getSelectedContent() {
    return this.selectedContent;
  }

  setSelectedRange(input: Range | null) {
    this.selectedRange = input;
  }

  getSelectedRange() {
    return this.selectedRange;
  }
}
