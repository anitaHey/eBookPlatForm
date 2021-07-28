import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FontManagementService } from 'src/app/services/text-services/font-management.service';

@Component({
  selector: 'app-font-family-button',
  templateUrl: './font-family-button.component.html',
  styleUrls: ['./font-family-button.component.css']
})
export class FontFamilyButtonComponent implements OnInit {

  @Input() n_bg_color !: string;
  @Input() n_color !: string;
  @Input() h_bg_color !: string;
  @Input() h_color !: string;
  @Input() text !: string;
  @Input() setting !: string;
  @Input() border_style : string = "0";
  @Input() padding : string = "20px 20px";
  @Input() font_family !: string;
  @Output() btnClick = new EventEmitter();
  color!: string;
  bg_color!: string;

  constructor(private fontService: FontManagementService) {
    this.fontService.familyChanged$.subscribe(()=> {
      this.changeBtn(false);
    });
  }

  ngOnInit(): void {
    this.changeBtn(false);
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
