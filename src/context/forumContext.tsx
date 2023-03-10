import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import forumReducer from '../reducers/forumReducer';
import { GET_CATEGORIES, GET_FORUMS } from '../actions/actions';

const categories = [
  { id: 1, name: 'main' },
  { id: 2, name: 'addition' },
];

const forums = [
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
];

interface ForumProps {
  children: ReactNode;
}

type TForumContext = {
  getCategories: () => void;
  getForums: () => void;
  categories: [{ id: number; name: string }];
};

const initialState = {
  categories: [],
  forums: [],
  isLoading: false,
};

const ForumContext = React.createContext({} as TForumContext);

export const ForumProvider = ({ children }: ForumProps) => {
  const [state, dispatch] = useReducer(forumReducer, initialState);
  const getCategories = () => {
    dispatch({ type: GET_CATEGORIES, payload: categories });
  };
  const getForums = () => {
    dispatch({ type: GET_FORUMS, payload: forums });
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <ForumContext.Provider value={{ ...state, getCategories, getForums }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForumContext = () => {
  return useContext(ForumContext);
};
