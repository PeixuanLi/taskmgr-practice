import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { QuoteService } from '../services/quote.service';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from '../actions/quote.action';
import {of} from 'rxjs/observable/of';
@Injectable()
export class QuoteEffects {

    @Effect()
    quote$:Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.QUOTE)
        .map(toPayload)
        .switchMap(() => this.quoteService
        .getQuote()
        .map(q => new actions.QuoteSuccessAction(q))
        .catch(err => of(new actions.QuoteFailAction(JSON.stringify(err))))
    )


    constructor(
        private actions$ : Actions, private quoteService: QuoteService){}
}