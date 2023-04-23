import {
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_FORUM,
  GET_TOPIC,
  POST_TOPIC,
  LOADING_TRUE,
  LOADING_FALSE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
  MODAL_SIGNUP_OPEN,
  MODAL_SIGNUP_CLOSE,
  MODAL_NEWTOPIC_OPEN,
  MODAL_NEWTOPIC_CLOSE,
} from '../actions/actions';

const forumReducer = (
  state: any,
  action: { [key: string]: string | number | {} }
) => {
  if (action.type === GET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }
  if (action.type === GET_CATEGORY) {
    return {
      ...state,
      forums: action.payload,
    };
  }
  if (action.type === GET_FORUM) {
    return {
      ...state,
      topics: action.payload,
      isLoading: false,
    };
  }
  if (action.type === POST_TOPIC) {
    return {
      ...state,
      topics: action.payload,
    };
  }
  if (action.type === GET_TOPIC) {
    return {
      ...state,
      posts: action.payload,
    };
  }
  if (action.type === LOADING_TRUE) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOADING_FALSE) {
    return { ...state, isLoading: true };
  }
  if (action.type === NAVBAR_OPEN) {
    return { ...state, isNavbarOpen: true };
  }
  if (action.type === NAVBAR_CLOSE) {
    return { ...state, isNavbarOpen: false };
  }
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
  if (action.type === MODAL_NEWTOPIC_OPEN) {
    return { ...state, isModalNewTopic: true };
  }
  if (action.type === MODAL_NEWTOPIC_CLOSE) {
    return { ...state, isModalNewTopic: false };
  }
  return { ...state };
};

export default forumReducer;
