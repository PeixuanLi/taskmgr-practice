import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {
  title :string;
  form: FormGroup;
  coverImages:string[];
  imageTitle = "";

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private mdDialogRef : MdDialogRef<NewProjectComponent>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    if(this.data.project){
      this.form = this.fb.group({
        name:[this.data.project.name,Validators.required],
        desc:[this.data.project.desc],
        coverImg:[this.data.project.coverImg]
      });
      this.title = "Edit Project";
    } else{
      this.form = this.fb.group({
        name:['',Validators.required],
        desc:[''],
        coverImg:[this.data.img]
      });
      this.title = "New Project";
    }
    
    // console.log("dialog opened:"+JSON.stringify(this.data));
    // this.title = this.data.title;
  }
  onSubmit({value,valid}, env:Event){
    env.preventDefault();
    if(!valid){
      return;
    }
   
    this.mdDialogRef.close({name: value.name, desc: value.desc ? value.desc : null, coverImg: value.coverImg});
    
  }
}
