import { Component } from '@angular/core';
import { SlideInOutAnimation } from '../../animation/SlideInOutAnimation'
import { MainSlideInOutAnimation } from '../../animation/MainSlideInOutAnimation'
import { HostListener } from "@angular/core";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-document-main-page',
  templateUrl: './document-main-page.component.html',
  styleUrls: ['./document-main-page.component.css'],
  animations: [SlideInOutAnimation, MainSlideInOutAnimation]
})
export class DocumentMainPageComponent {
  screenHeight!: number;
  screenWidth!: number;

  documentMainMinW : string = "300px";
  documentMainMaxW : string = "300px";

  chooseAreaState = 'in';
  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.changeChooseSize();
  }

  toggleChooseArea() {
    this.chooseAreaState = this.chooseAreaState === 'out' ? 'in' : 'out';
    this.changeChooseSize();
  }

  changeChooseSize(): string[] {
    var tem = [((this.screenWidth - 384) + "px"), ((this.screenWidth - 72) + "px")];

    this.documentMainMinW = tem[0];
    this.documentMainMaxW = tem[1];

    return tem;
  }
}
