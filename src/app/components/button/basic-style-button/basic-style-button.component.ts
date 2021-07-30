import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-basic-style-button',
  templateUrl: './basic-style-button.component.html',
  styleUrls: ['./basic-style-button.component.css']
})
export class BasicStyleButtonComponent implements OnInit {
  @Input() n_bg_color !: string;
  @Input() n_color !: string;
  @Input() h_bg_color !: string;
  @Input() h_color !: string;
  @Input() text !: string;
  @Input() setting !: string;
  @Input() border_style : string = "0";
  @Input() padding : string = "20px 20px";
  @Output() btnClick = new EventEmitter();
  color!: string;
  bg_color!: string;

  constructor() { }

  ngOnInit(): void {
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
}
