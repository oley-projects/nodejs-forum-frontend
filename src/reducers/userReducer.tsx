import { SET_USER, SET_IS_AUTH } from '../actions/actions';

const userReducer = (state: any, action: any) => {
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === SET_IS_AUTH) {
    return { ...state, isAuth: action.payload };
  }
  return { ...state };
};

export default userReducer;
