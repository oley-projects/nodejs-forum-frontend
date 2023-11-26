import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import generalReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';

import {
  SET_FORUM,
  //SET_TOPIC,
  //SET_TOPIC_POSTS,
} from '../actions/actions';
import { forumAPI } from '../api/api';

interface IForumProps {
  children: ReactNode;
}

export type TForumContext = {
  getForum: (name: string, page?: number, limit?: number) => void;
  postForum: (args: {}) => void;
  deleteForum: (forumId: number) => void;
};

const initialState = {
  forums: [],
  forum: {},
};

const ForumContext = React.createContext({} as TForumContext);

export const ForumProvider = ({ children }: IForumProps) => {
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
  } = useGeneralContext();
  const [state, dispatch]: any = useReducer<any>(generalReducer, initialState);
  const pages = Math.ceil(totalItems / pageSize);
  const getForum = async (name: string, page?: number, limit?: number) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await forumAPI.getData(name, page, limit);
      const { totalItems, topics } = data.data;
      setForum(topics);
      setTotalItems(totalItems);
    } catch (error) {
      console.log(error);
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
      if (forumData.requestType === 'new topic') {
        await forumAPI.postTopic(forum);
        if (totalItems % pageSize === 0) {
          setCurrentPage(pages + 1);
          getForum('topics', pages + 1);
        } else {
          setCurrentPage(pages);
          getForum('topics', pages);
        }
      } else if (forumData.requestType === 'edit topic') {
        await forumAPI.updateTopic(forum);
        getForum('topics', currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteForum = async (forumId: number) => {
    try {
      await forumAPI.deleteTopic(forumId);
      if (currentPage > 1 && state.forums.length === 1) {
        setCurrentPage(currentPage - 1);
        getForum('topics', currentPage - 1);
      } else {
        getForum('topics', currentPage);
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
      getForum('topics');
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
