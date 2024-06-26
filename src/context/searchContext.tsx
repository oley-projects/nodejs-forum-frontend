import React, { ReactNode, useContext, useReducer } from 'react';
import { useGeneralContext } from './generalContext';
import generalReducer from '../reducers/generalReducer';
import {
  SET_FOUND_RESULTS,
  SET_SORT_RESULTS,
  SET_TYPE_RESULTS,
} from '../actions/actions';
import { forumAPI } from '../api/api';
import { errorHandler } from '../utils/utils';
export type TSearchContext = {
  setSortResults: (sortResults: string) => void;
  setTypeResults: (typeResults: string) => void;
  getFoundResults: (
    searchRequest: string,
    type: string,

    sort: string,
    page: number,
    limit: number
  ) => void;
  foundResults: [any];
  sortResults: string;
  typeResults: string;
};

interface ISearchProps {
  children: ReactNode;
}

const initialState = {
  foundResults: [],
  sortResults: 'createdAt_desc',
  typeResults: 'post',
};

const SearchContext = React.createContext({} as TSearchContext);

export const SearchProvider = ({ children }: ISearchProps) => {
  const [state, dispatch]: any = useReducer<any>(generalReducer, initialState);
  const {
    setIsLoading,
    setInitialLoad,
    isLoading,
    initialLoad,
    setTotalItems,
    isError,
    errorType,
    errorText,
    setIsError,
    setErrorType,
    setErrorText,
  } = useGeneralContext();

  const setFoundResults = (foundResults: []) =>
    dispatch({ type: SET_FOUND_RESULTS, payload: foundResults });
  const getFoundResults = async (
    keywords: string,
    type: string,
    sort: string,
    page?: number,
    limit?: number
  ) => {
    if (!isLoading) setIsLoading(true);
    try {
      if (type === 'post') {
        const data = await forumAPI.requestPosts(keywords, sort, page, limit);
        const { posts, totalItems } = data.data;
        setFoundResults(posts);
        setTotalItems(totalItems);
      }
      if (type === 'topic') {
        const data = await forumAPI.requestTopics(keywords, sort, page, limit);
        const { topics, totalItems } = data.data;
        setFoundResults(topics);
        setTotalItems(totalItems);
      }
      if (type === 'user') {
        const data = await forumAPI.requestUsers(keywords, sort, page, limit);
        const { users, totalItems } = data.data;
        setFoundResults(users);
        setTotalItems(totalItems);
      }
    } catch (error) {
      errorHandler(
        error,
        isError,
        errorType,
        errorText,
        setIsError,
        setErrorType,
        setErrorText
      );
    } finally {
      setIsLoading(false);
      if (initialLoad) {
        setInitialLoad(false);
      }
    }
  };
  const setSortResults = (sortResults: boolean) =>
    dispatch({ type: SET_SORT_RESULTS, payload: sortResults });
  const setTypeResults = (typeResults: boolean) =>
    dispatch({ type: SET_TYPE_RESULTS, payload: typeResults });

  return (
    <SearchContext.Provider
      value={{ ...state, getFoundResults, setSortResults, setTypeResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
