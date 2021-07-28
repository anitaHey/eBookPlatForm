import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextStyleManagementService {
  static textStyle = class {
    fontColor: string = "black";
    fontSize: number = 20;
    fontFamily: string = "Verdana";

    constructor() {
    }

    setNewStyle(newColor: string, newSize: number, newFamily: string) {
        this.fontColor = newColor;
        this.fontSize = newSize;
        this.fontFamily = newFamily;
    }

    getCurStyle() {
      return {
        "family" : this.fontFamily,
        "size": this.fontSize,
        "color": this.fontColor
      };
    }
  }

  current_style: InstanceType<typeof TextStyleManagementService.textStyle>[] = [];
  constructor() { }

  addNewStyleClass(newColor: string, newSize: number, newFamily: string) {
    this.current_style.push(new TextStyleManagementService.textStyle());
  }
}
