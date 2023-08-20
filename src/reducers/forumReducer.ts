import {
  SET_CATEGORIES,
  SET_CATEGORY,
  SET_FORUM,
  SET_TOPIC,
  POST_TOPIC,
  SET_POST,
  POST_POST,
  LOADING_TRUE,
  LOADING_FALSE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  SET_TOTAL_ITEMS,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  INITIAL_LOAD,
} from '../actions/actions';
import { TState } from '../context/formItemContext';

const forumReducer = (
  state: TState,
  action: { [key: string]: string | number }
) => {
  if (action.type === SET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }
  if (action.type === SET_CATEGORY) {
    return {
      ...state,
      forums: action.payload,
    };
  }
  if (action.type === SET_FORUM) {
    return {
      ...state,
      topics: action.payload,
    };
  }
  if (action.type === POST_TOPIC) {
    return {
      ...state,
      topics: action.payload,
    };
  }
  if (action.type === SET_TOPIC) {
    return {
      ...state,
      posts: action.payload,
    };
  }
  if (action.type === POST_POST) {
    return {
      ...state,
      topics: action.payload,
    };
  }
  if (action.type === SET_POST) {
    return {
      ...state,
      posts: action.payload,
    };
  }
  if (action.type === LOADING_TRUE) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOADING_FALSE) {
    return { ...state, isLoading: false };
  }
  if (action.type === NAVBAR_OPEN) {
    return { ...state, isNavbarOpen: true };
  }
  if (action.type === NAVBAR_CLOSE) {
    return { ...state, isNavbarOpen: false };
  }
  if (action.type === SET_TOTAL_ITEMS) {
    return { ...state, totalItems: action.payload };
  }
  if (action.type === SET_CURRENT_PAGE) {
    return { ...state, currentPage: action.payload };
  }
  if (action.type === SET_PAGE_SIZE) {
    return { ...state, pageSize: action.payload };
  }
  if (action.type === INITIAL_LOAD) {
    return { ...state, initialLoad: false };
  }
  return { ...state };
};

export default forumReducer;
