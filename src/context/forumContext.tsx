import React, { useContext, useReducer } from 'react';
import forumReducer from '../reducers/forumReducer';
import { GET_CATEGORIES, GET_FORUMS } from '../actions/actions';

type Context = {};

const initialState = {
  categories: [],
  forums: [],
  isLoading: false,
};

const ForumContext = React.createContext<Context>({});

export const ForumProvider = () => {
  const [state, dispatch] = useReducer(forumReducer, initialState);
  const getCategories = () => {
    dispatch({ type: GET_CATEGORIES });
  };
  const getForums = () => {
    dispatch({ type: GET_FORUMS });
  };

  return (
    <ForumContext.Provider
      value={{ ...(state as {}), getCategories, getForums }}
    />
  );
};

export const useForumContext = () => {
  return useContext(ForumContext);
};
