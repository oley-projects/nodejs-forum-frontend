import { GET_CATEGORIES, GET_FORUMS } from '../actions/actions';

const forumReducer = (
  state: {},
  action: { [key: string | number]: string | number }
) => {
  if (action.type === GET_CATEGORIES) {
    return {
      ...state,
      categories: [
        { id: 1, name: 'main' },
        { id: 2, name: 'addition' },
      ],
    };
  }
  if (action.type === GET_FORUMS) {
    return {
      ...state,
      forums: [
        { id: 1, name: 'Topic 1', categoty: 'main' },
        { id: 2, name: 'Topic 2', categoty: 'main' },
        { id: 3, name: 'Topic 3', categoty: 'addition' },
        { id: 4, name: 'Topic 4', categoty: 'main' },
        { id: 5, name: 'Topic 5', categoty: 'main' },
        { id: 6, name: 'Topic 6', categoty: 'main' },
        { id: 7, name: 'Topic 7', categoty: 'addition' },
        { id: 8, name: 'Topic 8', categoty: 'addition' },
        { id: 9, name: 'Topic 9', categoty: 'addition' },
        { id: 10, name: 'Topic 10', categoty: 'main' },
      ],
    };
  }
  return { ...state };
};

export default forumReducer;
