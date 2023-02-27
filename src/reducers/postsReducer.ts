import { NAVBAR_OPEN, NAVBAR_CLOSE } from '../actions/actions';

const postsReducer = (
  state: { isNavbarOpen: boolean },
  action: { [key: string]: string | number }
) => {
  if (action.type === NAVBAR_OPEN) {
    return { ...state, isNavbarOpen: true };
  }
  if (action.type === NAVBAR_CLOSE) {
    return { ...state, isNavbarOpen: false };
  }
  return { ...state };
};

export default postsReducer;
