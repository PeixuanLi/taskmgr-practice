
import {NgModule} from '@angular/core';
/**
 * combineReducers 接收一系列的 reducer 作为参数，然后创建一个新的 reducer
 * 这个新的 reducer 接收到各 reducer 的值后，按 reducer 的 key 进行存储。
 * 把这个新的 reducer 想象成一个数据库，各个子 reducer 就像数据库中的表。
 *
 */
import {ActionReducer, combineReducers, StoreModule} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {createSelector} from 'reselect';
import {environment} from '../../environments/environment';
import {Auth} from '../domain';

/**
 * compose 函数是一个很方便的工具，简单来说，它接受任意数量的函数作为参数，然后返回一个新的函数。
 * 这个新的函数其实就是前面的函数的叠加，比如说，我们给出 `compose(f(x), g(x))`, 返回的新函数
 * 就是 `g(f(x))`。
 */
import {compose} from '@ngrx/core/compose';
/**
 * storeFreeze 用于防止 state 被修改，在 Redux 中我们必须确保 state 是不可更改的，这个函数
 * 有助于帮我们检测 state 是否被有意或无意的修改了。当 state 发生修改时，会抛出一个异常，这一点
 * 在开发时非常有帮助。根据环境变量的值，发布时会不包含这个函数。
 */
import {storeFreeze} from 'ngrx-store-freeze';
/**
 * 分别从每个 reducer 中将需要导出的函数或对象进行导出，并起个易懂的名字
 */
import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as authActions from '../actions/auth.action';

/**
 * 正如我们的 reducer 像数据库中的表一样，我们的顶层 state 也包含各个子 reducer 的 state
 * 并且使用一个 key 来标识各个子 state
 */
export interface State {
  quote: fromQuote.State;
  auth: Auth,
}

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
/**
 * 使用 combineReducers 把所有子 reducer 合并产生一个顶级 reducer
 */
const productionReducer: ActionReducer<State> = combineReducers(reducers);

const initState = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
};

export function reducer(state: any, action: any) {
  if (action.type === authActions.ActionTypes.LOGOUT) {
    return initState;
  }
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;

//createSelector will save the search result
//问题 这里面第一个函数不应该也有个参数吗?
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getAuth = createSelector(getAuthState, fromAuth.getAuth);


@NgModule({
  imports: [
    /**
     * StoreModule.provideStore  仅需引入一次，请把它包含在根模块或者 CoreModule 中
     * 我们这里为了方便组织，新建了一个 AppStoreModule，但也是只在 CoreModule 中引入的
     */
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    // DevTool 需要在 StoreModule 之后导入
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ]
})
export class AppStoreModule {
}
