import { Subject } from 'rxjs';
import { PaperComponent } from './../area/paper/paper.component';
import { Injectable, ComponentRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaperManagementService {
  callAddPaper = new Subject();
  addPaperCalled$ = this.callAddPaper.asObservable();
  paperArr = new Array<ComponentRef<PaperComponent>>()
  current_page = 0;

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
}
