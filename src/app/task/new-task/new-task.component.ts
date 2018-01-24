import { Component, OnInit, Input, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent implements OnInit {
  title:string = "";
  form: FormGroup;
  notConfirm = true;
  delInvisible = true;
  priorities : { label: string; value: number }[] = [
    {
      label: '普通',
      value: 3
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '紧急',
      value: 1
    },
  ];
  
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialogRef: MdDialogRef<NewTaskComponent>
    ) { }

  ngOnInit() {
    this.title = this.data.title;
    if (!this.data.task) {
      this.form = this.fb.group({
        desc: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        priority: [3],
        dueDate: [],
        reminder: [],
        owner: [[this.data.owner]],
        followers: [[]],
        remark: ['',  Validators.maxLength(40)]
      });
      this.title = 'Create Task：';
      this.delInvisible = true;
    } else {
      this.form = this.fb.group({
        desc: [this.data.task.desc, Validators.compose([Validators.required, Validators.maxLength(20)])],
        priority: [this.data.task.priority],
        dueDate: [this.data.task.dueDate],
        reminder: [this.data.task.reminder],
        owner: [this.data.task.owner ? [{name: this.data.task.owner.name, value: this.data.task.owner.id}] : []],
        followers: [this.data.task.participants ? [...this.data.task.participants] : []],
        remark: [this.data.task.remark, Validators.maxLength(40)]
      });
      this.title = 'Edit Task：';
      this.delInvisible = false;
    }
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({type: 'addOrUpdate', task: {
      desc: value.desc,
      participantIds: value.followers.map(u => u.id),
      ownerId: value.owner.length > 0 ? value.owner[0].id : null,
      dueDate: value.dueDate,
      reminder: value.reminder,
      priority: value.priority,
      remark: value.remark
    }});
  }
}
