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
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as action from '../../actions/project.action';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight,listAnimation],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit, OnDestroy{

@HostBinding('@routeAnim') state;
  projects;
  projects$;
  sub :Subscription;
  listAnim$: Observable<number>;
  constructor(
    private dialog:MdDialog, 
    private cd: ChangeDetectorRef, 
    private store$ : Store<fromRoot.State>,
    
  ) { 
    this.store$.dispatch(new action.LoadProjectsAction({}));
    this.projects$ = this.store$.select(fromRoot.getProjects);
    //功能?
    this.listAnim$ = this.projects$.map(p => p.length);
  }

  ngOnInit() {
    
    // this.sub = this.service$.get("37489e0c-df34-c261-71c4-ce75357e3035").subscribe(projects => {
    //   this.projects = projects;
    //   this.cd.markForCheck();
    // });
  }
  // 并非直接实现 OnDestroy 而是 ngOnDestroy
  ngOnDestroy(){
    // if(this.sub){
    //   this.sub.unsubscribe;
    // }
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
    dialogRef.afterClosed().take(1).filter(n=>n)
    //redux way
    .subscribe(project => {
      const coverImg = this.buildImgSrc(project.coverImg);
      this.store$.dispatch(new action.AddProjectAction({...project,coverImg:coverImg}));
    })
    //因为有可能是主动关闭的窗口, 需要筛选有内容的数据 
    // .filter(project=>project)
    // .map(project =>({...project, coverImg: this.buildImgSrc(project.coverImg)}))
    // .switchMap(project => this.service$.add(project))
    // .subscribe(project => {
    //   // this.projects.add(project);
    //   this.projects = [...this.projects,project];
    //   console.log(project);
    //   this.cd.markForCheck();

    // });
  }
  launchInviteDialog(project:Project){
    // const dialogRef = this.dialog.open(InviteComponent);
    let members = [];
    
    this.store$.select(fromRoot.getProjectMembers(project.id))
      .take(1)
      .subscribe(m => members = m);
    const dialogRef = this.dialog.open(InviteComponent, {data: { members: members}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new action.InviteMembersAction({projectId: project.id, members: val}));
      }
    });
  }

  launchUpdateDialog(project:Project){
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      {data:{
          thumbnails:this.getThumbnails(),
          project:project, 
        }}
    
    );
    dialogRef.afterClosed().take(1).filter(n=>n)
    //redux way
    .subscribe(val => {
      const coverImg = this.buildImgSrc(val.coverImg);
      this.store$.dispatch(new action.UpdateProjectAction({...val,id: project.id ,coverImg:coverImg}));
    })
    // .filter(project=>project)
    // .map(val =>({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImage)}))
    // .switchMap(v => this.service$.update(v))
    // .subscribe(project => {
    //   const index = this.projects.map(p =>p.id).indexOf(project.id);
    //   this.projects = [...this.projects.slice(0,index),project,...this.projects.slice(index+1)]
    //   this.cd.markForCheck();

    // });
    
  }
  launchComfirmDialog(project:Project){
    const dialogRef = this.dialog.open(ComfirmDialogComponent,{data:{title:"Delete Project", content:"Are you sure to delet the project?"}});
    dialogRef.afterClosed().take(1)
    //redux way
    .subscribe(val => {
      if(val){
        this.store$.dispatch(new action.DeleteProjectAction(project));
      }
    })
    // .filter(n => n)
    // .switchMap(prj => this.service$.del(project))
    // .subscribe(prj =>{
    //   this.projects = this.projects.filter(p => p.id !==prj.id);
    //   this.cd.markForCheck();
    // });
    
    
  }
  selectProject(project:Project){
    this.store$.dispatch(new action.SelectProjectAction(project));
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
