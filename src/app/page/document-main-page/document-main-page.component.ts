import { Component, OnInit } from '@angular/core';
import { SlideInOutAnimation } from '../../animation/SlideInOutAnimation'
import { MainSlideInOutAnimation } from '../../animation/MainSlideInOutAnimation'
import { WindowServiceService } from "../../services/window-service.service";
import { PaperManagementService } from './../../services/paper-management.service';

@Component({
  selector: 'app-document-main-page',
  templateUrl: './document-main-page.component.html',
  styleUrls: ['./document-main-page.component.css'],
  animations: [SlideInOutAnimation, MainSlideInOutAnimation],
})
export class DocumentMainPageComponent {
  documentMainMinW : number = 300;
  documentMainMaxW : number = 300;
  chooseDisplay = "block";
  styleDisplay = "none";

  curStyleState = 'close';
  curChooseState = 'in';
  chooseAreaState = 'in';
  constructor(private windowService: WindowServiceService, private paperService: PaperManagementService) {
    this.windowService.updateMainSize().then(res => this.updateMainSize());

    windowService.isMainSizeChange.subscribe((value) => {
      this.updateMainSize();
    });
  }

  ngAfterContentChecked(): void {
    if(this.paperService.getPaperArr()["size"] == 0){
      this.paperService.createNewPaper();
    }
  }

  toggleStyleArea(type: string) {
    if(this.curStyleState == "close") {
      if(this.chooseAreaState == 'out') {
        this.chooseAreaState = 'in';
        this.chooseAreaAnimation();
      }

      this.chooseDisplay = "none";
      this.styleDisplay = "block";
      this.curStyleState = "out";
    } else {
      if(this.curChooseState == 'out') {
        this.chooseAreaState = 'out';
        this.chooseAreaAnimation();
      } else {
        this.chooseDisplay = "block";
        this.styleDisplay = "none";
      }

      this.curStyleState = "close";
    }
  }

  toggleChooseArea(type: string) {
    if(this.chooseAreaState == 'in') {
      if(this.curStyleState == "out") {
        this.curStyleState = "close";
        this.styleDisplay = "none";
        this.chooseDisplay = "block";
      } else {
        this.chooseAreaState = 'out';
        this.curChooseState = 'out';

        this.chooseAreaAnimation();
      }
    } else {
      this.styleDisplay = "none";
      this.chooseDisplay = "block";
      this.curChooseState = 'in';
      this.chooseAreaState = 'in';
      this.chooseAreaAnimation();
    }
  }

  chooseAreaAnimation() {
    this.windowService.setToggleState(this.chooseAreaState);
    this.windowService.updateMainSize().then(res => this.updateMainSize());
  }

  updateMainSize() {
    var tem = this.windowService.getMainDocumentSize();
    this.documentMainMinW = tem["min"];
    this.documentMainMaxW = tem["max"];
  }
}
