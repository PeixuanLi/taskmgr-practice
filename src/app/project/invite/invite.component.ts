import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';
import { User } from '../../domain/index';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit {
  members : User[];
  dialogTitle: string;

  items;
  constructor(@Inject(MD_DIALOG_DATA) private data :any,
  private dialogRef: MdDialogRef<InviteComponent>) { 

  }

  ngOnInit() {
    this.dialogTitle = this.dialogTitle? this.dialogTitle: "Invite";
  }

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }

}
