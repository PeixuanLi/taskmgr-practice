import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../../domain/quote';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  quote;
  quote$: Observable<Quote>;
  constructor(private quoteService$: QuoteService,
      private store$: Store<fromRoot.State>,
    ) { 
        this.quote$ = this.store$.select(fromRoot.getQuote);
        // 不使用 effect 的方式
        // this.quoteService$.getQuote().subscribe(q=>{
        //   this.store$.dispatch(new actions.QuoteSuccessAction(q));
        // });
    // 不使用 redux 的方式
    // this.quote$ = quotes.getQuote();
    // .subscribe(quote => {
    //   this.quote = quote;
    // });
  }

  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl('wpcfan@163.com',Validators.compose([Validators.email, Validators.required])),
      password : new FormControl('wp123456',Validators.required)
    });
    this.store$.dispatch({type: actions.ActionTypes.QUOTE});
  }
  onSubmit({value,valid}, ev: Event){
    ev.preventDefault();
    if(!valid){
      return;
    }
    this.store$.dispatch(
      new authActions.LoginAction({
        email: value.email,
        password: value.password
      }));
  }
}
