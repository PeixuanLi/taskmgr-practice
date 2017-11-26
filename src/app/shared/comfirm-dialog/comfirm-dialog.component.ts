import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-comfirm-dialog',
  template: `
<form>
  <h2 md-dialog-title>{{title}}</h2>
  <div md-dialog-content>
    {{content}}
  </div>
  <div md-dialog-actions>
    <button md-raised-button color="primary" (click) = "onClick(true)" type="button"> Yes </button>
    <button md-button md-dialog-close (click) = "onClick(false)">Cancel</button>
  </div>
</form>
  `,
  styles: []
})
export class ComfirmDialogComponent implements OnInit {
  title = '';
  content = '';

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<ComfirmDialogComponent>,
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }
  onClick(result:boolean){
    this.dialogRef.close(result);
  }
}
