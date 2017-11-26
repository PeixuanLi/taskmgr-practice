import { Component, OnInit, Input, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent implements OnInit {
  title:string = "";
  priorities : [
    {
      value:'severe',
      lable: 1
    },
    {
      value:'high',
      lable: 2
    },
    {
      value:'nomoal',
      lable: 3
    }
  ];
  constructor(@Inject(MD_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data.task));
  }

}
