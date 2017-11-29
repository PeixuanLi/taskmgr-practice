import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ComfirmDialogComponent } from '../../shared/comfirm-dialog/comfirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anim/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnim') state;

  lists = [
    {
      id: "BkenST66lb",
      name: "待办",
      order:1,
      tasks: [
        {
          id: 1,
          desc: "赶快出发去万达",
          completed : true,
          priority:1,
          owner:{
            id: 1,
            name: "Project Manager",
            avatar: "avatars:svg-2",
          },
          dueDate: new Date(),
          reminder:new Date(),
        },
        {
          id: 3,
          desc: "赶快出发去火锅店",
          completed : false,
          priority:2,
          owner:{
            id: 1,
            name: "Project Manager",
            avatar: "avatars:svg-1",
          },
          dueDate: new Date(),
        }
      ]
      
    },
    {
      id: "BkenST66lb",
      name: "待办",
      order:2,
      tasks: [
        {
          id: 2,
          desc: "赶快出发去万达",
          completed : false,
          priority:3,
          owner:{
            id: 2,
            name: "Project Manager",
            avatar: "avatars:svg-1",
          },
          dueDate: new Date(),
        }
      ]
      
    }
  ];
  
  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  launchNewTaskDialog(){
    const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:"New Task"}});
  }
  launchCopyTaskDialog(){
    const dialogRef =  this.dialog.open(CopyTaskComponent,{data:{lists: this.lists}});
  }
  launchUpdateTaskDialog(task){
    const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:"Edit",task:task}});
  }
  launchComfirmDialog(){
    const dialogRef = this.dialog.open(ComfirmDialogComponent,{data:{title:"Delete this List", content:"Are you sure to delet the List?"}});
    dialogRef.afterClosed().subscribe(result =>  console.log(result));
  
  }
  launchNewListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title:"Add New List"}});
    dialogRef.afterClosed().subscribe(result =>  console.log(result));
  }
  launchEditListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title:"Edit List Name"}});
    dialogRef.afterClosed().subscribe(result =>  console.log(result));
  }


  handleMove(srcData, taskList) {
    switch (srcData.tag) {
      case 'task-item': {
        console.log('handle task');
        break;
      }
      case 'task-list': {
        console.log('handle list');
        console.log(JSON.stringify(srcData.data));
        const srclist = srcData.data;
        const temp = srclist.order;
        srclist.order = taskList.order;
        taskList.order = temp;

        break;
      }
      default:
        break;
    }
  }
  handleQuickTask(desc:string){
    console.log(desc);

  }

}
