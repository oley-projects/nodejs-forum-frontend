import {
  LOADING_USER_TRUE,
  LOADING_USER_FALSE,
  SET_USER,
} from '../actions/actions';

const authReducer = (state: any, action: any) => {
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === LOADING_USER_TRUE) {
    return { ...state, isUserLoading: true };
  }
  if (action.type === LOADING_USER_FALSE) {
    return { ...state, isUserLoading: false };
  }
  return { ...state };
};

export default authReducer;
