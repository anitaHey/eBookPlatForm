import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleColorManagementService {
  styleColorList: Array<string>;
  constructor() {
    this.styleColorList = [];
  }

  addColorToList(input: string) {
    if(this.styleColorList.length >= 12)
      this.styleColorList.splice(0, 1);

    this.styleColorList.push(input);
  }

  getAllColor() {
    return this.styleColorList;
  }
}
