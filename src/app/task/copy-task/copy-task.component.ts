import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef,MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TaskList } from '../../domain/index';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class CopyTaskComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  lists$: Observable<TaskList>;

  constructor(private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<CopyTaskComponent>) {
  }

  ngOnInit() {
    this.lists$ = this.data.lists;
    if (this.data.type === 'move') {
      this.dialogTitle = 'Move All Tasks';
    }
    this.form = this.fb.group({
      targetList: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log({srcListId: this.data.srcListId, targetListId: value.targetList});
    this.dialogRef.close({srcListId: this.data.srcListId, targetListId: value.targetList});
  }
}
