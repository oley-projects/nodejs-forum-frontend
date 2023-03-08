import {
  GET_POSTS,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
  MODAL_SIGNUP_OPEN,
  MODAL_SIGNUP_CLOSE,
} from '../actions/actions';

const postsReducer = (
  state: {},
  action: { [key: string | number]: string | number }
) => {
  if (action.type === GET_POSTS) {
    return {
      ...state,
      posts: [
        { id: 1, text: 'post 1', forum: 'forum 1' },
        { id: 2, text: 'post 2', forum: 'forum 1' },
        { id: 3, text: 'post 3', forum: 'forum 3' },
        { id: 4, text: 'post 4', forum: 'forum 2' },
        { id: 5, text: 'post 5', forum: 'forum 2' },
        { id: 6, text: 'post 6', forum: 'forum 2' },
        { id: 7, text: 'post 7', forum: 'forum 3' },
        { id: 8, text: 'post 8', forum: 'forum 3' },
        { id: 9, text: 'post 9', forum: 'forum 1' },
        { id: 10, text: 'post 10', forum: 'forum 2' },
        { id: 11, text: 'post 11', forum: 'forum 2' },
        { id: 12, text: 'post 12', forum: 'forum 4' },
        { id: 13, text: 'post 13', forum: 'forum 5' },
        { id: 14, text: 'post 14', forum: 'forum 6' },
        { id: 15, text: 'post 15', forum: 'forum 6' },
        { id: 16, text: 'post 16', forum: 'forum 7' },
        { id: 17, text: 'post 17', forum: 'forum 8' },
        { id: 18, text: 'post 18', forum: 'forum 9' },
        { id: 19, text: 'post 19', forum: 'forum 10' },
      ],
    };
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
  return { ...state };
};

export default postsReducer;
