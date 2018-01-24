import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items : string[];
  form : FormGroup;
  private readonly avatarName = 'avatars';
  
  constructor(private fb:FormBuilder,
    private store$: Store<fromRoot.State>) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    this.form = this.fb.group({
      email:[],
      name:[],
      password:[],
      repeat:[],
      avatar:[img],
      dateOfBirth:[],
    });
  }
  onSubmit({value,valid}, ev: Event){
    ev.preventDefault();
    if(!valid){
      return;
    }
    this.store$.dispatch(
      new actions.RegisterAction({
        password: value.password,
        name: value.name,
        email: value.email,
        avatar: value.avatar,
        identity: value.identity,
        address: value.address,
        dateOfBirth: value.dateOfBirth
      }));
  }

}
export class tile{
  
  cols: number;
  rows: number;
  text: string ;
  constructor(cols,rows,text){
    this.cols=cols;
    this.rows=rows;
    this.text=text;
  }
}
