import { Component, OnInit } from '@angular/core';
import { FontManagementService } from 'src/app/services/font-management.service';

@Component({
  selector: 'app-document-main-style-area',
  templateUrl: './document-main-style-area.component.html',
  styleUrls: ['./document-main-style-area.component.css']
})
export class DocumentMainStyleAreaComponent implements OnInit {
  font_family_list: string[];
  font_family_state: string[];
  currentFamily!: string;
  currentFamilyNum: number = 0;

  constructor(private fontService: FontManagementService) {
    this.font_family_list = ['Noto Sans TC', 'Arial', 'Sans Serif', 'Comic Sans MS', 'Times New Roman', 'Courier New',
      'Verdana', 'Trebuchet MS', 'Arial Black', 'Impact', 'Bookman', 'Garamond', 'Palatino', 'Georgia'];

    this.font_family_state = ["#f0f0f0", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
    this.currentFamily = fontService.getCurrentFamily();
  }

  ngOnInit(): void {
  }

  clickFamily(num: number): void {
    this.font_family_state[this.currentFamilyNum] = "#fff";
    this.font_family_state[num] = "#f0f0f0";

    this.currentFamilyNum = num;

    setTimeout(()=>{
      this.fontService.setTemFamily();
    }, 10);
  }
}
