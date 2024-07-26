import React, { ReactNode, useContext, useReducer } from 'react';
import generalReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';
import { useCategoryContext } from './categoryContext';
import { SET_FORUM } from '../actions/actions';
import { forumAPI } from '../api/api';
import { errorHandler } from '../utils/utils';

interface IForumProps {
  children: ReactNode;
}

export type TForumContext = {
  getForum: (id: number, page?: number, limit?: number) => void;
  postForum: (args: {}) => void;
  deleteForum: (forumId: number) => void;
  forum: {
    id: number;
    name: string;
    description: string;
    creator: { _id: string; name: string };
    topics: [
      {
        id: number;
        name: string;
        description: string;
        creator: { _id: string; name: string };
        posts: [];
        createdAt: number;
        views: number;
        lastPost?: {
          creator: { _id: string; name: string };
          createdAt: number;
        };
      }
    ];
  };
};

const initialState = {
  forum: {},
};

const ForumContext = React.createContext({} as TForumContext);

export const ForumProvider = ({ children }: IForumProps) => {
  const [state, dispatch]: any = useReducer<any>(generalReducer, initialState);
  const {
    setIsLoading,
    setTotalItems,
    setCurrentPage,
    totalItems,
    pageSize,
    currentPage,
    isLoading,
    pages,
    isError,
    errorType,
    errorText,
    setIsError,
    setErrorType,
    setErrorText,
  } = useGeneralContext();
  const { getCategories } = useCategoryContext();
  const getForum = async (forumId: number, page?: number, limit?: number) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await forumAPI.getForum(forumId, page, limit);
      const { totalItems, forum } = data.data;
      setForum(forum);
      setTotalItems(totalItems);
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
    }
  };
  const setForum = (forum: {}) => dispatch({ type: SET_FORUM, payload: forum });
  const postForum = async (forumData: {
    itemData: { id: number; name: string; description: string };
    requestType: string;
  }) => {
    const forum = {
      id: forumData.itemData.id,
      name: forumData.itemData.name,
      description: forumData.itemData.description,
    };
    try {
      if (forumData.requestType === 'new forum') {
        await forumAPI.postForum(forum);
        if (totalItems % pageSize === 0) {
          getCategories(pages + 1);
          setCurrentPage(pages + 1);
        } else {
          getCategories(pages);
          setCurrentPage(pages);
        }
      } else if (forumData.requestType === 'edit forum') {
        await forumAPI.updateForum(forum);
        getCategories(currentPage);
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
    }
  };
  const deleteForum = async (forumId: number) => {
    try {
      await forumAPI.deleteForum(forumId);
      getCategories(currentPage);
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
    }
  };

  return (
    <ForumContext.Provider
      value={{
        ...state,
        getForum,
        postForum,
        deleteForum,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export const useForumContext = () => {
  return useContext(ForumContext);
};
