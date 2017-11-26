import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {
  title : string = "";
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private mdDialogRef : MdDialogRef<NewProjectComponent>,
  ) { }

  ngOnInit() {
    console.log("dialog opened:"+JSON.stringify(this.data));
    this.title = this.data.title;
  }
  onClick(){
    this.mdDialogRef.close(`Message recieved!`);
  }
}
