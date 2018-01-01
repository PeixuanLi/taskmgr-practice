import { Component, OnInit, OnDestroy, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ComfirmDialogComponent } from '../../shared/comfirm-dialog/comfirm-dialog.component';
import { slideToRight } from '../../anim/router.anim';
import { listAnimation } from '../../anim/list.anim';
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
 
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight,listAnimation],
  // changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit, OnDestroy{

@HostBinding('@routeAnim') state;
  projects;
  sub :Subscription;
  // projects =[
  //   {
  //     "id" : 1,
  //     "name": "测试1",
  //     "desc": "项目描述",
  //     "coverImage": "assets/img/covers/0.jpg",
  //   }, 
  //   {
  //     "id" : 2,
  //     "name": "测试2",
  //     "desc": "项目描述",
  //     "coverImage": "assets/img/covers/2.jpg",
  //   }, 
  //   {
  //     "id" : 3,
  //     "name": "测试3",
  //     "desc": "项目描述",
  //     "coverImage": "assets/img/covers/3.jpg",
  //   }, 
     
  // ];
  constructor(
    private dialog:MdDialog, 
    private cd: ChangeDetectorRef, 
    private service$: ProjectService
    
  ) { }

  ngOnInit() {
    this.sub = this.service$.get("37489e0c-df34-c261-71c4-ce75357e3035").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();
    });
  }
  // 并非直接实现 OnDestroy 而是 ngOnDestroy
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe;
    }
  }
  openNewProjectDialog(){
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random()*40)}_tn.jpg`;
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      {data:{
          thumbnails:this.getThumbnails(),
          img:selectedImg,
        }}
    
    );
    //take(1)是为了关闭 subscribe 
    dialogRef.afterClosed().take(1)
    //因为有可能是主动关闭的窗口, 需要筛选有内容的数据 
    .filter(project=>project)
    .map(project =>({...project, coverImg: this.buildImgSrc(project.coverImg)}))
    .switchMap(project => this.service$.add(project))
    .subscribe(project => {
      // this.projects.add(project);
      this.projects = [...this.projects,project];
      console.log(project);
      this.cd.markForCheck();

    });
  }
  launchInviteDialog(){
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(project:Project){
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      {data:{
          thumbnails:this.getThumbnails(),
          project:project, 
        }}
    
    );
    dialogRef.afterClosed().take(1)
    .filter(project=>project)
    .map(val =>({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImage)}))
    .switchMap(v => this.service$.update(v))
    .subscribe(project => {
      const index = this.projects.map(p =>p.id).indexOf(project.id);
      this.projects = [...this.projects.slice(0,index),project,...this.projects.slice(index+1)]
      this.cd.markForCheck();

    });
    
  }
  launchComfirmDialog(project){
    const dialogRef = this.dialog.open(ComfirmDialogComponent,{data:{title:"Delete Project", content:"Are you sure to delet the project?"}});
    dialogRef.afterClosed().take(1)
    .filter(n => n)
    .switchMap(prj => this.service$.del(project))
    .subscribe(prj =>{
      this.projects = this.projects.filter(p => p.id !==prj.id);
      this.cd.markForCheck();
    });
    
    
  }
  getThumbnails(){
    return _.range(0,40)
    .map(i => `/assets/img/covers/${i}_tn.jpg`)
  }
  private buildImgSrc(img: string): string {
    if(img)
      return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
