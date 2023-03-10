import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import postsReducer from '../reducers/postsReducer';
import {
  GET_POSTS,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
  MODAL_SIGNUP_OPEN,
  MODAL_SIGNUP_CLOSE,
} from '../actions/actions';

const posts = [
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
];

interface PostsProps {
  children: ReactNode;
}

type TPostsContext = {
  openNavbar: () => void;
  closeNavbar: () => void;
  openModalLogin: () => void;
  closeModalLogin: () => void;
  openModalSignup: () => void;
  closeModalSignup: () => void;
  isModalLoginOpen: boolean;
  isModalSignupOpen: boolean;
  isNavbarOpen: boolean;
  posts: [{ id: number; text: string; forum: string }];
};

const initialState = {
  posts: [],
  isNavbarOpen: false,
  isModalLoginOpen: false,
  isModalSignupOpen: false,
};
const PostsContext = React.createContext({} as TPostsContext);

export const PostsProvider = ({ children }: PostsProps) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const getPosts = () => {
    dispatch({ type: GET_POSTS, payload: posts });
  };
  const openNavbar = () => {
    dispatch({ type: NAVBAR_OPEN });
  };
  const closeNavbar = () => {
    dispatch({ type: NAVBAR_CLOSE });
  };
  const openModalLogin = () => {
    dispatch({ type: MODAL_LOGIN_OPEN });
  };
  const closeModalLogin = () => {
    dispatch({ type: MODAL_LOGIN_CLOSE });
  };
  const openModalSignup = () => {
    dispatch({ type: MODAL_SIGNUP_OPEN });
  };
  const closeModalSignup = () => {
    dispatch({ type: MODAL_SIGNUP_CLOSE });
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <PostsContext.Provider
      value={{
        ...state,
        openNavbar,
        closeNavbar,
        openModalLogin,
        closeModalLogin,
        openModalSignup,
        closeModalSignup,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};
