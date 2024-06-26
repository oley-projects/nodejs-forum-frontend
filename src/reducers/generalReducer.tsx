import {
  SET_CATEGORIES,
  SET_LAST_POSTS,
  SET_FORUM,
  SET_TOPIC,
  SET_IS_LOADING,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  SET_TOTAL_ITEMS,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  SET_INITIAL_LOAD,
  SET_IS_POST_EDIT,
  SET_FOUND_RESULTS,
  SET_SORT_RESULTS,
  SET_TYPE_RESULTS,
  SET_IS_ERROR,
  SET_ERROR_TYPE,
  SET_ERROR_TEXT,
} from '../actions/actions';
import { TState } from '../context/formItemContext';

const generalReducer = (
  state: TState,
  action: { [key: string]: string | number }
) => {
  if (action.type === SET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }
  if (action.type === SET_LAST_POSTS) {
    return {
      ...state,
      lastPosts: action.payload,
    };
  }
  if (action.type === SET_FORUM) {
    return {
      ...state,
      forum: action.payload,
    };
  }
  if (action.type === SET_TOPIC) {
    return {
      ...state,
      topic: action.payload,
    };
  }
  if (action.type === SET_IS_LOADING) {
    return { ...state, isLoading: action.payload };
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
  if (action.type === SET_INITIAL_LOAD) {
    return { ...state, initialLoad: action.payload };
  }
  if (action.type === SET_IS_POST_EDIT) {
    return { ...state, isPostEdit: action.payload };
  }
  if (action.type === SET_FOUND_RESULTS) {
    return { ...state, foundResults: action.payload };
  }
  if (action.type === SET_SORT_RESULTS) {
    return { ...state, sortResults: action.payload };
  }
  if (action.type === SET_TYPE_RESULTS) {
    return { ...state, typeResults: action.payload };
  }
  if (action.type === SET_IS_ERROR) {
    return { ...state, isError: action.payload };
  }
  if (action.type === SET_ERROR_TYPE) {
    return { ...state, errorType: action.payload };
  }
  if (action.type === SET_ERROR_TEXT) {
    return { ...state, errorText: action.payload };
  }
  return { ...state };
};

export default generalReducer;
