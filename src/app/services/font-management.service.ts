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

  constructor() { }

  setTemFamily() {
    this.changeFamily.next();
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
}
