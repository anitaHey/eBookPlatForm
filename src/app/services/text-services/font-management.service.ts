import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontManagementService {
  changeFamily = new Subject();
  familyChanged$ = this.changeFamily.asObservable();

  fontColor: string = "black";
  fontSize: number = 20;
  fontFamily: string = "Verdana";
  font_family_list: string[];

  constructor() {
    this.font_family_list = ['current', 'Noto Sans TC', 'Arial', 'Sans Serif', 'Comic Sans MS', 'Times New Roman', 'Courier New',
      'Verdana', 'Trebuchet MS', 'Arial Black', 'Impact', 'Bookman', 'Garamond', 'Palatino', 'Georgia'];
  }

  getAllFontFamily() {
    return this.font_family_list;
  }

  setTemFamily(input: string) {
    this.changeFamily.next(input);

    this.setCurrentFamily(input);
  }

  getCurrentColor(): string {
    return this.fontColor;
  }

  getCurrentSize(): number {
    return this.fontSize;
  }

  getCurrentFamily(): string {
    return this.fontFamily;
  }

  setCurrentFamily(input: string): void {
    this.fontFamily = input;
  }

  setCurrentSize(input: number): void {
    this.fontSize = input;
  }

  setCurrentColor(input: string): void {
    this.fontColor = input;
  }

  removeQuotes(str: string) {
    if (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"')
        return str.substr(1, str.length - 2);
    else
        return str;
}
}
