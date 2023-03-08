import React, { ReactNode, useContext, useReducer } from 'react';
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

interface PostsProps {
  children: ReactNode;
}

type Context = {
  getPosts: () => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  openModalLogin: () => void;
  closeModalLogin: () => void;
  openModalSignup: () => void;
  closeModalSignup: () => void;
  isModalLoginOpen: boolean;
  isModalSignupOpen: boolean;
  isNavbarOpen: boolean;
};

const initialState = {
  posts: [],
  isNavbarOpen: false,
  isModalLoginOpen: false,
  isModalSignupOpen: false,
};

const PostsContext = React.createContext({} as Context);

export const PostsProvider = ({ children }: PostsProps) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const getPosts = () => {
    dispatch({ type: GET_POSTS });
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

  return (
    <PostsContext.Provider
      value={{
        ...(state as any),
        getPosts,
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
