import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import generalReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';
import { useCategoryContext } from './categoryContext';

import { SET_FORUM } from '../actions/actions';
import { forumAPI } from '../api/api';

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
        createdAt: string;
        views: string;
        lastPostUser: string;
        lastPostCreatedAt: string;
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
    initialLoad,
    forumType,
    pathId,
    pages,
  } = useGeneralContext();
  const { getCategories, getCategory, category } = useCategoryContext();
  const getForum = async (forumId: number, page?: number, limit?: number) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await forumAPI.getForum(forumId, page, limit);
      const { totalItems, forum } = data.data;
      setForum(forum);
      setTotalItems(totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getData = (
    forumType: string,
    id: number,
    currentPage?: number,
    limit?: number
  ) => {
    if (forumType === 'categories') {
      getCategories();
    } else if (forumType === 'category') {
      getCategory(id, currentPage, limit);
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
        console.log(forum);
        if (totalItems % pageSize === 0) {
          getData(forumType, category.id, pages + 1);
          setCurrentPage(pages + 1);
        } else {
          getData(forumType, category.id, pages);
          setCurrentPage(pages);
        }
      } else if (forumData.requestType === 'edit forum') {
        await forumAPI.updateForum(forum);
        getCategory(category.id, currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteForum = async (forumId: number) => {
    try {
      await forumAPI.deleteForum(forumId);
      if (currentPage > 1 && state.forums.length === 1) {
        getData(forumType, category.id, currentPage - 1);
        setCurrentPage(currentPage - 1);
      } else {
        getData(forumType, category.id, currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (initialLoad && !isLoading && forumType === 'forum') {
      if (currentPage > 1) {
        setCurrentPage(1);
      }
      getForum(pathId);
    }
    // eslint-disable-next-line
  }, []);

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
