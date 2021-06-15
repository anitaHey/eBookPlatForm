import { Component } from '@angular/core';
import { SlideInOutAnimation } from '../../animation/SlideInOutAnimation'
import { MainSlideInOutAnimation } from '../../animation/MainSlideInOutAnimation'
import { WindowServiceService } from "../../services/window-service.service";

@Component({
  selector: 'app-document-main-page',
  templateUrl: './document-main-page.component.html',
  styleUrls: ['./document-main-page.component.css'],
  animations: [SlideInOutAnimation, MainSlideInOutAnimation],
})
export class DocumentMainPageComponent {
  documentMainMinW : number = 300;
  documentMainMaxW : number = 300;

  chooseAreaState = 'in';
  constructor(private windowService: WindowServiceService) {
    this.windowService.updateMainSize().then(res => this.updateMainSize());

    windowService.isMainSizeChange.subscribe((value) => {
      this.updateMainSize();
    });
  }

  toggleChooseArea(type: string) {
    this.chooseAreaState = this.chooseAreaState === 'out' ? 'in' : 'out';
    this.windowService.setToggleState(this.chooseAreaState);
    this.windowService.updateMainSize().then(res => this.updateMainSize());
  }

  updateMainSize() {
    var tem = this.windowService.getMainDocumentSize();
    this.documentMainMinW = tem["min"];
    this.documentMainMaxW = tem["max"];
  }
}
