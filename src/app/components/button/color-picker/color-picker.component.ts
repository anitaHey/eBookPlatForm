import { Component, OnInit } from '@angular/core';
import { StyleColorManagementService } from 'src/app/services/style-color-management.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  color: string = "#000";
  saveColorList: string[] = [];
  constructor(private colorManagement: StyleColorManagementService) {
    this.saveColorList = colorManagement.getAllColor();
  }

  ngOnInit(): void {
  }

  changeColor(color: string): void {
    this.colorManagement.addColorToList(color);
    this.saveColorList = this.colorManagement.getAllColor();
  }
}
