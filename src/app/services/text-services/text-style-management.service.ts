import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextStyleManagementService {
  static textStyle = class {
    name: string = "";
    fontColor: string = "black";
    fontSize: number = 20;
    fontFamily: string = "Verdana";

    constructor() {
    }

    setNewStyle(name:string, newColor: string, newSize: number, newFamily: string) {
      this.name = name;
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

    getStyleName() {
      return this.name;
    }
  }

  current_style: Array<InstanceType<typeof TextStyleManagementService.textStyle>> = [];
  styleChange = new Subject();
  styleChanged$ = this.styleChange.asObservable();
  constructor() { }

  addNewStyleClass(name:string, newColor: string, newSize: number, newFamily: string) {
    let tem = new TextStyleManagementService.textStyle();
    tem.setNewStyle(name, newColor, newSize, newFamily);
    this.current_style.push(tem);
    this.styleChange.next();
  }

  updateStyle(num: number, name:string, newColor: string, newSize: number, newFamily: string) {
    this.current_style[num].setNewStyle(name, newColor, newSize, newFamily);
    this.styleChange.next();
  }

  getStyleByName(name: string) {
    return this.current_style.filter(s => s.getStyleName() === name)[0];
  }

  removeStyle(num: number) {
    this.current_style.splice(num,1);
    this.styleChange.next();
  }

  getTextStyleList() {
    return this.current_style;
  }
}
