import { Injectable } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowServiceService {
  originMainDocumentW: number = 1607;
  originMainDocumentH: number = 880;

  mainDocumentW: number[] = [0, 0];
  mainDocumentH: number = 880;

  originPaperW: number = 1280;
  originPaperH: number = 720;
  paperW: number = 1280;
  paperH: number = 720;

  currentW$: Observable<number>;
  currentH$: Observable<number>;

  toggleState: String = "in";
  isMainSizeChange: Subject<boolean> = new Subject<boolean>();
  isPaperSizeChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    const windowSize$ = new BehaviorSubject(this.getWindowSize());

    this.currentH$ = windowSize$.pipe(pluck('height'), distinctUntilChanged());
    this.currentW$ = windowSize$.pipe(pluck('width'), distinctUntilChanged());

    this.mainDocumentW = [window.innerWidth - 384, window.innerWidth - 72];
    const that = this;

    fromEvent(window, 'resize').pipe(map(this.getWindowSize))
      .subscribe({
        next(windowSize$) {
          that.updateMainSize();
          that.isMainSizeChange.next(true);
        }
      });
  }

  setToggleState(input: string): void {
    this.toggleState = input;
  }

  updateMainSize() {
    return new Promise<void>((resolve, reject) => {
      this.mainDocumentW = [this.getWindowSize()["width"] - 384, this.getWindowSize()["width"] - 72];
      this.mainDocumentH = this.getWindowSize()["height"] - 56;

      var w = (this.toggleState === "out") ? this.mainDocumentW[1] : this.mainDocumentW[0];
      var tem = Math.max((this.originMainDocumentW / w), (this.originMainDocumentH / this.mainDocumentH));
      this.paperW = this.originPaperW / tem;
      this.paperH = this.originPaperH / tem;

      this.isPaperSizeChange.next(true);
      resolve();
    });
  }

  getMainDocumentSize() {
    return {
      min: this.mainDocumentW[0],
      max: this.mainDocumentW[1]
    };
  }

  getPaperSize() {
    return {
      width: this.paperW,
      height: this.paperH
    };
  }

  getWindowSize() {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }
}
