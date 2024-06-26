import React, { ReactNode, useContext, useReducer } from 'react';
import generalReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';
import { useForumContext } from './forumContext';
import { SET_TOPIC } from '../actions/actions';
import { forumAPI } from '../api/api';
import { errorHandler } from '../utils/utils';

interface ITopicProps {
  children: ReactNode;
}
export type TTopicContext = {
  getTopic: (id: number, page?: number, limit?: number) => void;
  postTopic: (args: {}) => void;
  deleteTopic: (postId: number) => void;
  topic: {
    id: number;
    name: string;
    posts: [
      {
        id: number;
        description: string;
        creator: { name: string; _id: string };
        createdAt: string;
        topic: { name: string; id: number };
      }
    ];
  };
};

const initialState = {
  topic: {},
};

const TopicContext = React.createContext({} as TTopicContext);

export const TopicProvider = ({ children }: ITopicProps) => {
  const [state, dispatch]: any = useReducer<any>(generalReducer, initialState);
  const {
    setIsLoading,
    setTotalItems,
    setCurrentPage,
    totalItems,
    currentPage,
    pageSize,
    isLoading,
    pages,
    isError,
    errorType,
    errorText,
    setIsError,
    setErrorType,
    setErrorText,
  } = useGeneralContext();
  const { getForum, forum } = useForumContext();
  const getTopic = async (topicId: number, page?: number, limit?: number) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await forumAPI.getTopic(topicId, page, limit);
      const { totalItems, topic } = data.data;
      setTopic(topic);
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
  const setTopic = (topic: {}) => dispatch({ type: SET_TOPIC, payload: topic });
  const postTopic = async (topicData: {
    itemData: { id: number; name: string; description: string };
    requestType: string;
  }) => {
    const topic = {
      id: topicData.itemData.id,
      name: topicData.itemData.name,
      description: topicData.itemData.description,
    };
    try {
      if (topicData.requestType === 'new topic') {
        await forumAPI.postTopic(topic);
        if (totalItems % pageSize === 0) {
          setCurrentPage(pages + 1);
          getForum(forum.id, pages + 1);
        } else {
          setCurrentPage(pages);
          getForum(forum.id, pages);
        }
      } else if (topicData.requestType === 'edit topic') {
        await forumAPI.updateTopic(topic);
        getForum(forum.id, currentPage);
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
  const deleteTopic = async (topicId: number) => {
    try {
      await forumAPI.deleteTopic(topicId);
      if (currentPage > 1 && forum.topics.length === 1) {
        setCurrentPage(currentPage - 1);
        getForum(forum.id, currentPage - 1);
      } else {
        getForum(forum.id, currentPage);
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

  return (
    <TopicContext.Provider
      value={{
        ...state,
        getTopic,
        postTopic,
        deleteTopic,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export const useTopicContext = () => {
  return useContext(TopicContext);
};
