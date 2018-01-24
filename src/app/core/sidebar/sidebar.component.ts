import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {getDate} from 'date-fns';
import { Project } from '../../domain/index';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../reducers"
import { Observable } from 'rxjs/Observable';
import * as action from '../../actions/project.action';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() navClick = new EventEmitter<void>();

  today = 'day';
  projects$ :Observable<Project>;
  constructor(private store$ : Store<fromRoot.State>) { 
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  ngOnInit() {
    this.today = `day${getDate(new Date)}` ;
    console.log(this.today);
    console.log(getDate(new Date));
  }
  onNavClick(){
    this.navClick.emit();
  }
  onPrjClick(project: Project){
    console.log({...project});
    this.store$.dispatch(new action.SelectProjectAction(project));
    this.navClick.emit();
  }
}
