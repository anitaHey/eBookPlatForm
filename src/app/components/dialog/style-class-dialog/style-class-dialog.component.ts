import { Component, OnInit, HostListener } from '@angular/core';
import { ColorPickerControl } from '@iplab/ngx-color-picker';
import { FontManagementService } from 'src/app/services/text-services/font-management.service';

@Component({
  selector: 'app-style-class-dialog',
  templateUrl: './style-class-dialog.component.html',
  styleUrls: ['./style-class-dialog.component.css']
})
export class StyleClassDialogComponent implements OnInit {
  font_family_list: string[];
  curFamily: string;
  curSize: number;
  public colorControl = new ColorPickerControl();
  public colorVisible: boolean = false;

  constructor(private fontService: FontManagementService) {
    this.font_family_list = fontService.getAllFontFamily();
    this.curFamily = fontService.getCurrentFamily();
    this.curSize = fontService.getCurrentSize();
  }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
    public showColorPicker(event: MouseEvent) {
        if (this.colorVisible === true) {
            return;
        }

        this.colorVisible = !this.colorVisible;
  }

  public overlayClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.colorVisible = false;
}

}
