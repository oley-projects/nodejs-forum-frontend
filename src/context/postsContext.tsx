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

const date = new Date().toLocaleString();

const posts = [
  { id: 2, text: 'post 2', topic: 'topic 1', user: 'User', createdAt: date },
  { id: 1, text: 'post 1', topic: 'topic 1', user: 'User', createdAt: date },
  { id: 3, text: 'post 3', topic: 'topic 3', user: 'User', createdAt: date },
  { id: 4, text: 'post 4', topic: 'topic 2', user: 'User', createdAt: date },
  { id: 5, text: 'post 5', topic: 'topic 2', user: 'User', createdAt: date },
  { id: 6, text: 'post 6', topic: 'topic 2', user: 'User', createdAt: date },
  { id: 7, text: 'post 7', topic: 'topic 3', user: 'User', createdAt: date },
  { id: 8, text: 'post 8', topic: 'topic 3', user: 'User', createdAt: date },
  { id: 9, text: 'post 9', topic: 'topic 1', user: 'User', createdAt: date },
  { id: 10, text: 'post 10', topic: 'topic 2', user: 'User', createdAt: date },
  { id: 11, text: 'post 11', topic: 'topic 2', user: 'User', createdAt: date },
  { id: 12, text: 'post 12', topic: 'topic 4', user: 'User', createdAt: date },
  { id: 13, text: 'post 13', topic: 'topic 5', user: 'User', createdAt: date },
  { id: 14, text: 'post 14', topic: 'topic 6', user: 'User', createdAt: date },
  { id: 15, text: 'post 15', topic: 'topic 6', user: 'User', createdAt: date },
  { id: 16, text: 'post 16', topic: 'topic 7', user: 'User', createdAt: date },
  { id: 17, text: 'post 17', topic: 'topic 8', user: 'User', createdAt: date },
  { id: 18, text: 'post 18', topic: 'topic 9', user: 'User', createdAt: date },
  { id: 19, text: 'post 19', topic: 'topic 10', user: 'User', createdAt: date },
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
  posts: [
    { id: number; text: string; topic: string; user: string; createdAt: string }
  ];
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
