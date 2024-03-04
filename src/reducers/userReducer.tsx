import {
  LOADING_USER_TRUE,
  LOADING_USER_FALSE,
  SET_USER,
  SET_IS_AUTH,
} from '../actions/actions';

const userReducer = (state: any, action: any) => {
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === LOADING_USER_TRUE) {
    return { ...state, isUserLoading: true };
  }
  if (action.type === LOADING_USER_FALSE) {
    return { ...state, isUserLoading: false };
  }
  if (action.type === SET_IS_AUTH) {
    return { ...state, isAuth: action.payload };
  }
  return { ...state };
};

export default userReducer;
