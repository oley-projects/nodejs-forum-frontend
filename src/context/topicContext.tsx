import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import generalReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';
import { SET_TOPIC /*, SET_TOPIC_POSTS*/ } from '../actions/actions';
import { forumAPI } from '../api/api';

interface ITopicProps {
  children: ReactNode;
}

export type TTopicContext = {
  getTopic: (id: number, page?: number, limit?: number) => void;
  postTopic: (args: {}) => void;
  deleteTopic: (postId: number) => void;
  topic: { name: string };
  topics: [
    {
      _id: string;
      id: number;
      name: string;
      description: string;
      creator: { _id: string; name: string };
      createdAt: string;
      forum: { _id: string; name: string };
      posts: [];
      views: string;
      lastPostUser: string;
      lastPostCreatedAt: string;
    }
  ];
};

const initialState = {
  topics: [],
  topic: {},
};

const TopicContext = React.createContext({} as TTopicContext);

export const TopicProvider = ({ children }: ITopicProps) => {
  const {
    setIsLoading,
    setTotalItems,
    setCurrentPage,
    totalItems,
    currentPage,
    pageSize,
    isLoading,
    initialLoad,
    forumType,
    pathId,
  } = useGeneralContext();
  const [state, dispatch]: any = useReducer<any>(generalReducer, initialState);
  const pages = Math.ceil(totalItems / pageSize);

  const getTopic = async (topicId: number, page?: number, limit?: number) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await forumAPI.getTopic(topicId, page, limit);
      const { totalItems, /*posts, */ topic } = data.data;
      // setTopicPosts(posts);
      setTopic(topic);
      setTotalItems(totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const setTopic = (topic: {}) => dispatch({ type: SET_TOPIC, payload: topic });
  /* const setTopicPosts = (posts: []) =>
    dispatch({ type: SET_TOPIC_POSTS, payload: posts }); */
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
          getTopic(topic.id, pages + 1);
        } else {
          setCurrentPage(pages);
          getTopic(topic.id, pages);
        }
      } else if (topicData.requestType === 'edit topic') {
        await forumAPI.updateTopic(topic);
        getTopic(topic.id, currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTopic = async (topicId: number) => {
    try {
      await forumAPI.deleteTopic(topicId);
      if (currentPage > 1 && state.topics.length === 1) {
        setCurrentPage(currentPage - 1);
        getTopic(topicId, currentPage - 1);
      } else {
        getTopic(topicId, currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (initialLoad && !isLoading && forumType === 'topic' && pathId) {
      if (currentPage > 1) {
        setCurrentPage(1);
      }
      getTopic(pathId);
    }
    // eslint-disable-next-line
  }, []);

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
