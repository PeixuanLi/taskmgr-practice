import * as quoteAction from '../actions/quote.action';
import { Quote } from '../domain/index';


export interface State {
    quote: Quote;
};

export const initialState: State = {
    quote : {
        "id": "0",
        "en": "In the morning, LORD, you hear my voice; in the morning I lay my requests before you and wait expectantly.",
        "from": "Psalm 5:3 (NIV)",
        "pic": "/assets/img/quotes/0.jpg"
      }
};

export function reducer(state = initialState, action: {type: string; payload:any} ): State {
    switch (action.type) {
        case quoteAction.ActionTypes.QUOTE_SUCCESS: {
            // return Object.assign({},state,{quote:action.payload})
            return {...state, quote: action.payload};
        }
        case quoteAction.ActionTypes.QUOTE_FAIL: 
        default: {
            return state;
        }
    }
}
export const getQuote = (state: State) => state.quote;