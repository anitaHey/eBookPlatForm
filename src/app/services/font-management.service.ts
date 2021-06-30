import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontManagementService {
  fontColor: string = "black";
  fontSize: number = 20;
  fontFamily: string = "sans-serif";

  constructor() { }

  getCurrentColor(): string {
    return this.fontColor;
  }

  getCurrentSize(): number {
    return this.fontSize;
  }

  getCurrentFamily(): string {
    return this.fontFamily;
  }
}
