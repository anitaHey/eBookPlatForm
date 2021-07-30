import { Component, OnInit, Input } from '@angular/core';
import { BasicStyleButtonComponent } from '../basic-style-button/basic-style-button.component';

@Component({
  selector: 'app-style-class-button',
  templateUrl: './style-class-button.component.html',
  styleUrls: ['./style-class-button.component.css']
})
export class StyleClassButtonComponent extends BasicStyleButtonComponent implements OnInit {
  @Input() font_family !: string;
  @Input() font_size !: number;
  @Input() font_color !: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
