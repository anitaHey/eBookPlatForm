import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(private fontService: FontManagementService, private dialogRef: MatDialogRef<StyleClassDialogComponent>) {
    this.font_family_list = fontService.getAllFontFamily();
    this.curFamily = fontService.getCurrentFamily();
    this.curSize = fontService.getCurrentSize();
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  getFontStyles(){
    let styles = {
      'font-family':"Verdana",
      'line-height': "150px",
      'font-size': "150px",
      'font-color': "#000"
    };

    return styles;
  }
}
