import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../../domain/index';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  auth$ :Observable<Auth>;
  
  @Output()
  toggle = new EventEmitter<void>();

  @Output()
  toggleDarkTheme = new EventEmitter<boolean>();
  //导入了一个svg icon (需要http模块 )
  constructor(
    private store$ : Store<fromRoot.State>
  ) {
    this.auth$ = this.store$.select(fromRoot.getAuth);
  }

  ngOnInit() {
  }

  openSidebar(){
    this.toggle.emit();
  }
  onChange(checked: boolean){
    this.toggleDarkTheme.emit(checked);
  }
  logout() {
    this.store$.dispatch({type: actions.ActionTypes.LOGOUT});
  }
}
