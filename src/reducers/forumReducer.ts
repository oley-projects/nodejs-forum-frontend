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
  GET_TOTAL_ITEMS,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
} from '../actions/actions';
import { TState } from '../context/formItemContext';

const forumReducer = (
  state: TState,
  action: { [key: string]: string | number }
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
    const topics = action.payload;
    return {
      ...state,
      topics,
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
  if (action.type === GET_TOTAL_ITEMS) {
    return { ...state, totalItems: action.payload };
  }
  if (action.type === SET_CURRENT_PAGE) {
    return { ...state, currentPage: action.payload };
  }
  if (action.type === SET_PAGE_SIZE) {
    return { ...state, pageSize: action.payload };
  }
};

export default forumReducer;
