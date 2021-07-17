import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.css']
})
export class BasicButtonComponent implements OnInit {
  @Input() n_bg_color !: string;
  @Input() n_color !: string;
  @Input() h_bg_color !: string;
  @Input() h_color !: string;
  @Input() text !: string;
  @Input() icon_text !: string;
  @Input() icon_size !: string;
  @Input() pic_src !: string;
  @Input() pic_size !: string[];
  @Input() setting !: string;
  @Input() layout_text !: string;
  @Input() border_style : string = "0";
  @Input() padding : string = "20px 20px";
  @Input() font_family !: string;
  @Output() btnClick = new EventEmitter();
  color!: string;
  bg_color!: string;
  icon !: IconProp;


  constructor() { }

  ngOnInit(): void {
    this.changeBtn(false);
    this.getIcon(this.icon_text);
  }

  changeBtn(bool:boolean): void {
    if(bool){
      this.color = this.h_color;
      this.bg_color = this.h_bg_color;
    } else {
      this.color = this.n_color;
      this.bg_color = this.n_bg_color;
    }
  }

  onClick() {
    this.btnClick.emit();
  }

  getIcon(input: string) {
    if(input == "left_arrow")
      this.icon = faChevronLeft;
    else if(input == "pic_image")
      this.icon = faImage;
  }

}
