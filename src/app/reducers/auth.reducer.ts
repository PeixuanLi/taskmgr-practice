import {Auth} from '../domain';
import * as actions from '../actions/auth.action';

export const initialState: Auth = {};

export function reducer(state: Auth = initialState, action: actions.Actions): Auth {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCESS:
    case actions.ActionTypes.REGISTER_SUCCESS: {
      const auth = <Auth>action.payload;
    //   console.log("LOGIN_SUCCESS",auth);
      // return auth;
      return{
        token: auth.token,
        userId: auth.user.id
      };
    }
    case actions.ActionTypes.LOGIN_FAIL:
    case actions.ActionTypes.REGISTER_FAIL: {
      return {err: action.payload};
    }
    // 为什么不写在这里呢?
    // case actions.ActionTypes.LOGOUT:{
    //     return {};
    // }
    default: {
      return state;
    }
  }
}

export const getAuth = (state: Auth) => state;
