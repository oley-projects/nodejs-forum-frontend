import React, { ReactNode, useContext, useReducer } from 'react';
import postsReducer from '../reducers/postsReducer';
import { NAVBAR_OPEN, NAVBAR_CLOSE } from '../actions/actions';

interface PostsProps {
  children: ReactNode;
}

const initialState = {
  isNavbarOpen: false,
};

const PostsContext = React.createContext<any>({} as any);

export const PostsProvider = ({ children }: PostsProps) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const openNavbar = () => {
    dispatch({ type: NAVBAR_OPEN });
  };

  const closeNavbar = () => {
    dispatch({ type: NAVBAR_CLOSE });
  };

  return (
    <PostsContext.Provider
      value={{
        ...state,
        openNavbar,
        closeNavbar,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};
