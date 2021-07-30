import { Component, OnInit, Input, } from '@angular/core';
import { FontManagementService } from 'src/app/services/text-services/font-management.service';
import { BasicStyleButtonComponent } from '../basic-style-button/basic-style-button.component';

@Component({
  selector: 'app-font-family-button',
  templateUrl: './font-family-button.component.html',
  styleUrls: ['./font-family-button.component.css']
})
export class FontFamilyButtonComponent extends BasicStyleButtonComponent implements OnInit {
  @Input() font_family !: string;

  constructor(private fontService: FontManagementService) {
    super();
    this.fontService.familyChanged$.subscribe(()=> {
      this.changeBtn(false);
    });
  }

  ngOnInit(): void {
    this.changeBtn(false);
  }
}
