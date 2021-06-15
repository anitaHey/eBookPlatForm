import { PaperManagementService } from './../../services/paper-management.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-document-choose-area',
  templateUrl: './document-choose-area.component.html',
  styleUrls: ['./document-choose-area.component.css']
})
export class DocumentChooseAreaComponent implements OnInit {
  constructor(private paperService: PaperManagementService) { }

  ngOnInit(): void {

  }

  addText(){
    this.paperService.getCurrentPage().instance.createComponent("text");
  }
}
