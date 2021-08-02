import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FontManagementService } from 'src/app/services/text-services/font-management.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-style-class-dialog',
  templateUrl: './style-class-dialog.component.html',
  styleUrls: ['./style-class-dialog.component.css']
})
export class StyleClassDialogComponent implements OnInit {
  font_family_list: string[];
  curFamily: string;
  curSize: number;
  curColor: string;
  fm_control: any;
  fm_control1: any;
  matcher: any;
  matcher1: any;
  disable: boolean = true;

  constructor(private fontService: FontManagementService, private dialogRef: MatDialogRef<StyleClassDialogComponent>) {
    this.font_family_list = fontService.getAllFontFamily();
    this.curFamily = fontService.getCurrentFamily();
    this.curSize = fontService.getCurrentSize();
    this.curColor = "#000";
    dialogRef.disableClose = true;
    dialogRef.beforeClosed().subscribe(result => {
      if(this.fm_control.hasError('required') || this.fm_control1.hasError('required')) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    });

    this.fm_control = new FormControl('', [
      Validators.required,
    ]);

    this.fm_control1 = new FormControl('', [
      Validators.required,
    ]);

    this.matcher = new FormErrorStateMatcher();
    this.matcher1 = new FormErrorStateMatcher();
  }

  ngOnInit(): void {
  }

  changeSaveDisable(): boolean[]{
    let ans = [true, true];
    ans[0] = this.fm_control.hasError('required');
    ans[1] = this.fm_control1.hasError('required');

    if(ans[0] || ans[1]) this.disable = true;
    else this.disable = false;

    return ans;
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  changeFontColor(input: string) {
    this.curColor = input;
  }

  getFontStyles(){
    let styles = {
      'font-family': this.curFamily,
      'line-height': this.curSize + "px",
      'font-size':  this.curSize + "px",
      'color': this.curColor
    };

    return styles;
  }
}
