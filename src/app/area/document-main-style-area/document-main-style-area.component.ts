import { Component, OnInit } from '@angular/core';
import { FontManagementService } from 'src/app/services/font-management.service';

@Component({
  selector: 'app-document-main-style-area',
  templateUrl: './document-main-style-area.component.html',
  styleUrls: ['./document-main-style-area.component.css']
})
export class DocumentMainStyleAreaComponent implements OnInit {
  font_familt_list!: string[];
  font_family_list!: string[];
  currentFamily!: string;
  currentFamilyNum: number = 0;
  constructor(private fontService: FontManagementService) {
    this.font_familt_list = ['Noto Sans TC', 'Arial', 'Sans Serif', 'Comic Sans MS', 'Times New Roman', 'Courier New',
     'Verdana', 'Trebuchet MS', 'Arial Black', 'Impact', 'Bookman', 'Garamond', 'Palatino', 'Georgia'];

    this.font_family_list = ["#f0f0f0", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"];
    this.currentFamily = fontService.getCurrentFamily();
  }

  ngOnInit(): void {
  }

  clickFamily(num: number): void {
    this.font_family_list[this.currentFamilyNum] = "transparent";
    this.font_family_list[num] = "#f0f0f0";

    this.currentFamilyNum = num;
  }

}
