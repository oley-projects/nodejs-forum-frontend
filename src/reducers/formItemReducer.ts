import {
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
  MODAL_SIGNUP_OPEN,
  MODAL_SIGNUP_CLOSE,
  MODAL_FORUM_OPEN,
  MODAL_FORUM_CLOSE,
  EDITING_ENABLE,
  EDITING_DISABLE,
} from '../actions/actions';
import { TState } from '../context/formItemContext';

const formItemReducer = (
  state: TState,
  action: { [key: string]: string | number | {} }
) => {
  if (action.type === MODAL_LOGIN_OPEN) {
    return { ...state, isModalLoginOpen: true };
  }
  if (action.type === MODAL_LOGIN_CLOSE) {
    return { ...state, isModalLoginOpen: false };
  }
  if (action.type === MODAL_SIGNUP_OPEN) {
    return { ...state, isModalSignupOpen: true };
  }
  if (action.type === MODAL_SIGNUP_CLOSE) {
    return { ...state, isModalSignupOpen: false };
  }
  if (action.type === MODAL_FORUM_OPEN) {
    return { ...state, isModalForumOpen: true };
  }
  if (action.type === MODAL_FORUM_CLOSE) {
    return { ...state, isModalForumOpen: false };
  }
  if (action.type === EDITING_ENABLE) {
    return { ...state, isEditing: true };
  }
  if (action.type === EDITING_DISABLE) {
    return { ...state, isEditing: false };
  }
  return { ...state };
};

export default formItemReducer;
