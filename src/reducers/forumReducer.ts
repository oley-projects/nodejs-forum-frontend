import { GET_CATEGORIES, GET_FORUMS } from '../actions/actions';

const forumReducer = (
  state: any,
  action: { [key: string]: string | number | {} }
) => {
  if (action.type === GET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }
  if (action.type === GET_FORUMS) {
    return {
      ...state,
      forums: action.payload,
    };
  }
  return { ...state };
};

export default forumReducer;
