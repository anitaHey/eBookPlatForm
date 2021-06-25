import { Subject } from 'rxjs';
import { PaperComponent } from './../area/paper/paper.component';
import { Injectable, ComponentRef } from '@angular/core';
import { BasicObjComponent } from '../components/insert-object/basic-obj/basic-obj.component';

@Injectable({
  providedIn: 'root'
})
export class PaperManagementService {
  callAddPaper = new Subject();
  addPaperCalled$ = this.callAddPaper.asObservable();
  paperArr = new Array<ComponentRef<PaperComponent>>()
  current_page = 0;
  currentFocusObj: object | null = null;

  constructor() {
  }

  getCurrentPage() {
    return this.paperArr[this.current_page];
  }

  getPaperArr() {
    return {
      "size": this.paperArr.length,
    }
  }

  createNewPaper(){
    this.callAddPaper.next();
  }

  addNewPaper(child: ComponentRef<PaperComponent>) {
    this.paperArr.push(child);
  }

  setCurrentFocusObj(input: object | null) {
    if(this.currentFocusObj !== null) {
      (this.currentFocusObj as BasicObjComponent).removeFocus();
    }

    this.currentFocusObj = input;
  }

  getCurrentFocusObj() {
    return this.currentFocusObj;
  }
}
