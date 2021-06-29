import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insert-word',
  templateUrl: './insert-word.component.html',
  styleUrls: ['./insert-word.component.css']
})
export class InsertWordComponent implements OnInit {
  text: string = "";
  fontFamily: string = "sans-serif";
  fontColor: string = "black";
  fontSize: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
