import {
  SET_CATEGORIES,
  SET_CATEGORY,
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
  SET_REQUESTED_DATA,
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
  if (action.type === SET_CATEGORY) {
    return {
      ...state,
      category: action.payload,
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
  if (action.type === SET_REQUESTED_DATA) {
    return { ...state, requestedData: action.payload };
  }
  return { ...state };
};

export default generalReducer;
