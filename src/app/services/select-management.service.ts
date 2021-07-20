import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectManagementService {
  selectedContent!: any;
  selectedTextDiv!: Node[];
  selectedTextNew!:boolean[];
  selectedRange!: Range | null;
  constructor() { }

  setSelectedContent(input: any) {
    this.selectedContent = input;
  }

  setSelectTextDiv(input: Node[]) {
    this.selectedTextDiv = input;
  }

  setSelectTextIsNewLine(input: boolean[]) {
    this.selectedTextNew = input;
  }

  getSelectedContent() {
    return this.selectedContent;
  }

  getSelectTextDiv() {
    return this.selectedTextDiv;
  }

  setSelectedRange(input: Range | null) {
    this.selectedRange = input;
  }

  getSelectedRange() {
    return this.selectedRange;
  }

  getSelectTextIsNewLine() {
    return this.selectedTextNew;
  }
}
