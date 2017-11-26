import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items : string[];
  
  
  constructor() { }

  ngOnInit() {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);
  }

}
export class tile{
  
  cols: number;
  rows: number;
  text: string ;
  constructor(cols,rows,text){
    this.cols=cols;
    this.rows=rows;
    this.text=text;
  }
}
