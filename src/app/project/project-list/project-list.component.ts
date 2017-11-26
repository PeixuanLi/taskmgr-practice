import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ComfirmDialogComponent } from '../../shared/comfirm-dialog/comfirm-dialog.component';
import { slideToRight } from '../../anim/router.anim';
import { listAnimation } from '../../anim/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight,listAnimation],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {
@HostBinding('@routeAnim') state;

  projects =[
    {
      "id" : 1,
      "name": "测试1",
      "desc": "项目描述",
      "coverImage": "assets/img/covers/0.jpg",
    }, 
    {
      "id" : 2,
      "name": "测试2",
      "desc": "项目描述",
      "coverImage": "assets/img/covers/2.jpg",
    }, 
    {
      "id" : 3,
      "name": "测试3",
      "desc": "项目描述",
      "coverImage": "assets/img/covers/3.jpg",
    }, 
     
  ];
  constructor(private dialog:MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  openNewProjectDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title:"New Project"}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [... this.projects, {"id" : 4, "name": "测试4", "desc": "项目描述","coverImage": "assets/img/covers/0.jpg",
      }];
      this.cd.markForCheck();

    });
  }
  launchInviteDialog(){
    const dialogRef = this.dialog.open(InviteComponent);
  }
  launchEditDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title:"Edit"}});
  }
  launchComfirmDialog(project){
    const dialogRef = this.dialog.open(ComfirmDialogComponent,{data:{title:"Delete Project", content:"Are you sure to delet the project?"}});
    dialogRef.afterClosed().subscribe(result =>  console.log(result));
    this.projects = this.projects.filter(p => p.id !== project.id);
    this.cd.markForCheck();
  }
}
