import { Component, OnInit } from '@angular/core';
import { FontManagementService } from 'src/app/services/text-services/font-management.service';

@Component({
  selector: 'app-style-class-dialog',
  templateUrl: './style-class-dialog.component.html',
  styleUrls: ['./style-class-dialog.component.css']
})
export class StyleClassDialogComponent implements OnInit {
  font_family_list: string[];
  curFamily: string;
  curSize: number;

  constructor(private fontService: FontManagementService) {
    this.font_family_list = fontService.getAllFontFamily();
    this.curFamily = fontService.getCurrentFamily();
    this.curSize = fontService.getCurrentSize();
  }

  ngOnInit(): void {
  }

}
