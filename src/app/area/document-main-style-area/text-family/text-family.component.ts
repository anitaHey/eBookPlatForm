import { Component, OnInit } from '@angular/core';
import { FontManagementService } from 'src/app/services/font-management.service';
import { SelectManagementService } from 'src/app/services/select-management.service';

@Component({
  selector: 'app-text-family',
  templateUrl: './text-family.component.html',
  styleUrls: ['./text-family.component.css']
})
export class TextFamilyComponent implements OnInit {
  font_family_list: string[];
  font_family_state: string[];
  currentFamily!: string;
  currentFamilyNum: number = 0;

  constructor(private fontService: FontManagementService, private selectManagement: SelectManagementService) {
    this.font_family_list = ['current', 'Noto Sans TC', 'Arial', 'Sans Serif', 'Comic Sans MS', 'Times New Roman', 'Courier New',
      'Verdana', 'Trebuchet MS', 'Arial Black', 'Impact', 'Bookman', 'Garamond', 'Palatino', 'Georgia'];

    this.font_family_state = ["#f0f0f0", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
    this.currentFamily = fontService.getCurrentFamily();
    this.font_family_list[0] = this.currentFamily;
  }

  ngOnInit(): void {
  }

  clickFamily(num: number): void {
    this.font_family_state[this.currentFamilyNum] = "#fff";
    this.font_family_state[num] = "#f0f0f0";

    this.currentFamilyNum = num;

    this.changeTextFont(num);
    setTimeout(()=>{
      this.fontService.setTemFamily(this.font_family_list[num]);
    }, 10);
  }

  changeTextFont(num: number) {
    if (this.selectManagement.getSelectedContent!= null && this.selectManagement.getSelectedRange != null) {
        let font = this.font_family_list[num];
        let node_list = this.selectManagement.getSelectedContent();
        let length = node_list.length;
        let node = document.createElement('span');
        let count = 0;

        let first_node, last_node;
        for (let i = 0; i < length; i++) {
          if((node_list[count] as HTMLSpanElement).nodeName == "DIV") {
            let new_div = document.createElement('div');
            let child = Array.from(node_list[count].childNodes);
            for(let n = 0; n < child.length; n++) {
              if(first_node == null) first_node = (child[n] as Node).childNodes[0];
              if(i == length-1 && n == child.length-1) last_node = (child[n] as Node).childNodes[0];
              (child[n] as HTMLSpanElement).style.fontFamily = font;
              new_div.appendChild(child[n] as HTMLSpanElement);
            }
            node.appendChild(new_div);
            count++;
          } else {
            if(first_node == null) first_node = (node_list[count] as Node).childNodes[0];
            if(i == length-1) last_node = (node_list[count] as Node).childNodes[0];
            (node_list[count] as HTMLSpanElement).style.fontFamily = font;
            node.appendChild(node_list[count]);
          }
        }

        let range = (this.selectManagement.getSelectedRange() as unknown as Range);
        range.deleteContents();

        if(!this.selectManagement.getSelectTextDiv()[0].isSameNode(this.selectManagement.getSelectTextDiv()[1])) {
          if(!this.selectManagement.getSelectTextIsNewLine()[0]) {
            range.selectNodeContents(this.selectManagement.getSelectTextDiv()[0]);
            range.setStart(this.selectManagement.getSelectTextDiv()[0], this.selectManagement.getSelectTextDiv()[0].childNodes.length -1);
            range.setEnd(this.selectManagement.getSelectTextDiv()[0], this.selectManagement.getSelectTextDiv()[0].childNodes.length -1);

            let insert_tem = node.childNodes[0];
            range.insertNode(insert_tem);
            insert_tem.replaceWith(...Array.from(insert_tem.childNodes));

          }

          if(!this.selectManagement.getSelectTextIsNewLine()[1]) {
            range.selectNodeContents(this.selectManagement.getSelectTextDiv()[1]);
            range.setStart(this.selectManagement.getSelectTextDiv()[1], 0);
            range.setEnd(this.selectManagement.getSelectTextDiv()[1], 0);

            let insert_tem = node.childNodes[node.childNodes.length-1];
            range.insertNode(insert_tem);
            insert_tem.replaceWith(...Array.from(insert_tem.childNodes));
          }

          let array = Array.from((this.selectManagement.getSelectTextDiv()[0].parentElement as unknown as Element).childNodes);
          let first_num = 0;
          for(let num = 0; num < array.length; num++)
            if(array[num].isSameNode(this.selectManagement.getSelectTextDiv()[0])) first_num = num + 1;

          range.selectNodeContents(array[first_num]);
          range.setStart(array[first_num], 0);
          range.setEnd(array[first_num], 0);
        } else {
          range = (this.selectManagement.getSelectedRange() as unknown as Range);
        }

        range.insertNode(node);
        node.replaceWith(...Array.from(node.children));

        range.setStart(first_node as Node, 0);
        range.setEnd(last_node as Node, 1);
        window.getSelection()?.addRange(range);
        this.selectManagement.setSelectedRange(range);
        this.selectManagement.setSelectedContent(range.cloneContents().childNodes);
    }
  }
}
