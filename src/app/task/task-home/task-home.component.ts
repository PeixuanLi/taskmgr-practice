import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ComfirmDialogComponent } from '../../shared/comfirm-dialog/comfirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anim/router.anim';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { TaskList } from '../../domain/index';
import * as listActions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnim') state;
  projectId : string;
  lists$ : Observable<TaskList>;
  private routeParamSub: Subscription;
  
  constructor(
    private dialog: MdDialog, 
    private cd: ChangeDetectorRef,
    private store$ : Store<fromRoot.State>,
    private route: ActivatedRoute,

  ) { 
    const routeParam$ = this.route.params.pluck('id');
    // 建议使用 paramMap.map(p => p.get('id'));
    // const routeParam$ = this.route.paramMap.map(p => p.get('id'));
    this.routeParamSub = routeParam$.subscribe((id:string) =>{
      this.projectId = id;
    })
    this.lists$ = this.store$.select(fromRoot.getTasksByList);
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
  }
  ngOnInit() {
  }
  handleCompleteTask(task) {
    this.store$.dispatch(new taskActions.CompleteTaskAction(task));
  }
  launchNewTaskDialog(listId:string){
    const user$ = this.store$.select(fromRoot.getAuthUser);
    user$.take(1).filter(n=>n).subscribe(user => {
      console.log(user.name)
      const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:"New Task", owner: user }});
      dialogRef.afterClosed()
        .take(1)
        .filter(n => n)
        .subscribe(val => {
          this.store$.dispatch(new taskActions.AddTaskAction({
            ...val.task,
            taskListId: listId,
            completed: false,
            createDate: new Date()
          }));
        });
    });
  }
  launchCopyTaskDialog(listId:string){
    const list$ = this.store$
      .select(fromRoot.getProjectTaskList)
      .map(lists => lists.filter(list => list.id !== listId));
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: { srcListId: listId, lists: list$ }});
    dialogRef.afterClosed().take(1).filter(n => n).subscribe(val => {
      this.store$.dispatch(new taskActions.MoveAllAction(val));
    });
  }
  launchUpdateTaskDialog(task){
    const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:"Edit Task",  task:task}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(val => {
        this.store$.dispatch(new taskActions.UpdateTaskAction({...task, ...val.task} ));
      });
  }
  launchComfirmDialog(list:TaskList){
    const dialogRef = this.dialog.open(ComfirmDialogComponent,{data:{title:"Delete this List", content:"Are you sure to delet the List?"}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n =>n)
      .subscribe(result =>  {
        this.store$.dispatch(new listActions.DeleteTaskListAction(list))
      });
  
  }
  launchNewListDialog(event:Event){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title:"Add New List"}});
    dialogRef.afterClosed()
    .take(1)
    .filter(n=>n)
    .withLatestFrom(this.store$.select(fromRoot.getMaxListOrder), (_n, _o) => {
      return {
        name: _n,
        order: _o
      }
    })
    .subscribe(({name, order}) => {
      this.store$.dispatch(new listActions.AddTaskListAction({name: name, order: order + 1, projectId: this.projectId}))
    });
  }
  launchEditListDialog(list:TaskList){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title:"Edit List Name",tasklist:list}});
    dialogRef.afterClosed()
    .take(1)
    .filter(n=>n)
    .subscribe(result =>  {
      this.store$.dispatch(new listActions.UpdateTaskListAction({...list,name:result}))
    });
  }


  handleMove(srcData, taskList) {
    switch (srcData.tag) {
      case 'task-item': {
        this.store$.dispatch(new taskActions.MoveTaskAction({taskId: srcData.data.id, taskListId: taskList.id}));
        break;
      }
      case 'task-list': {
        this.store$.dispatch(new listActions.SwapOrderAction({src: srcData.data, target: taskList}));
        break;
      }
      default:
        break;
    }
  }
  handleQuickTask(desc:string,listId: string){
    const user$ = this.store$.select(fromRoot.getAuthUser);
    user$.take(1).subscribe(user => {
      this.store$.dispatch(new taskActions.AddTaskAction({
        desc: desc,
        priority: 3,
        remark: null,
        ownerId: user.id,
        participantIds: [],
        taskListId: listId,
        completed: false,
        createDate: new Date()
      }));
      
    });

  }

}
