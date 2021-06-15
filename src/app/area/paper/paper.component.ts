import { Component, Input, OnInit } from '@angular/core';
import { WindowServiceService } from "../../services/window-service.service";

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent {
  @Input() width: number = 1280;
  @Input() height: number = 720;

  constructor(private windowService: WindowServiceService) {
    windowService.updateMainSize().then(res => this.updatePaperSize());

    windowService.isPaperSizeChange.subscribe((value) => {
      this.updatePaperSize();
    });
  }

  updatePaperSize() {
    var tem = this.windowService.getPaperSize();
    this.width = tem["width"];
    this.height = tem["height"];
  }
}
