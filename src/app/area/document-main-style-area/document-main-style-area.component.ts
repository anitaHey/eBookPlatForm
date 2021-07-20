import { Component, OnInit } from '@angular/core';
import { FontManagementService } from 'src/app/services/font-management.service';
import { SelectManagementService } from 'src/app/services/select-management.service';

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

  constructor(private fontService: FontManagementService, private selectManagement: SelectManagementService) {
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

    this.changeTextFont(num);
    setTimeout(()=>{
      this.fontService.setTemFamily();
    }, 10);
  }

  // TODO: multiple line text change
  changeTextFont(num: number) {
    if (this.selectManagement.getSelectedContent!= null && this.selectManagement.getSelectedRange != null) {
        let font = this.font_family_list[num];
        let node_list = this.selectManagement.getSelectedContent();
        let length = node_list.length;
        var node = document.createElement('span');

        for (let i = 0; i < length; i++) {
          if((node_list[0] as HTMLSpanElement).nodeName == "DIV") {
            // console.log((node_list[0] as HTMLSpanElement).childNodes);
          } else {
            (node_list[0] as HTMLSpanElement).style.fontFamily = font;
            node.appendChild(node_list[0]);
          }
        }
        let range = (this.selectManagement.getSelectedRange() as unknown as Range);
        range.deleteContents();

        console.log(this.selectManagement.getSelectTextIsNewLine());


        range.insertNode(node);

        node.replaceWith(...Array.from(node.children));
    }
  }
}
