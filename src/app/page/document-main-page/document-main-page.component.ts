import { Component } from '@angular/core';
import { SlideInOutAnimation } from '../../animation/SlideInOutAnimation'
import { HostListener } from "@angular/core";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-document-main-page',
  templateUrl: './document-main-page.component.html',
  styleUrls: ['./document-main-page.component.css'],
  animations: [SlideInOutAnimation]
})
export class DocumentMainPageComponent {
  changingValue: Subject<string> = new Subject();
  screenHeight!: number;
  screenWidth!: number;

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

  changeChooseSize(): string {
    var other = this.chooseAreaState === 'in' ? 384 : 72;
    var tem = this.screenWidth - other;
    this.changingValue.next(tem + "px");

    return (tem + "px");
  }
}
