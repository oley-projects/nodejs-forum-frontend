import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import forumReducer from '../reducers/forumReducer';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_FORUM,
  GET_TOPIC,
  POST_TOPIC,
  LOADING_TRUE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
} from '../actions/actions';
import { forumAPI } from '../api/api';

const date = new Date().toLocaleString();

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

interface IForumProps {
  children: ReactNode;
}

type TForumContext = {
  getCategories: () => void;
  getCategory: () => void;
  getForum: () => void;
  getTopic: (args: number) => void;
  postTopic: (args: {}) => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  isNavbarOpen: boolean;
  isLoading: boolean;
  categories: [{ id: number; name: string }];
  topics: [
    {
      id: number;
      name: string;
      description: string;
      createdUser: string;
      createdAt: string;
      replies: string;
      views: string;
      lastPostUser: string;
      lastPostCreatedAt: string;
    }
  ];
  posts: [
    { id: number; text: string; topic: string; user: string; createdAt: string }
  ];
};

const initialState = {
  categories: [],
  forums: [],
  topics: [],
  posts: [],
  isLoading: false,
};

const ForumContext = React.createContext({} as TForumContext);

export const ForumProvider = ({ children }: IForumProps) => {
  const [state, dispatch]: any = useReducer<any>(forumReducer, initialState);
  const getCategories = async () => {
    if (!state.isLoading) {
      dispatch({ type: LOADING_TRUE });
    }
    try {
      const data = await forumAPI.getCategories();
      const categories = data.data.categories;
      dispatch({ type: GET_CATEGORIES, payload: categories });
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = () => {
    dispatch({ type: GET_CATEGORY, payload: forums });
  };
  const getForum = async () => {
    if (!state.isLoading) {
      dispatch({ type: LOADING_TRUE });
    }
    try {
      const data = await forumAPI.getForum();
      const topics = data.data.topics;
      dispatch({ type: GET_FORUM, payload: topics });
    } catch (error) {
      console.log(error);
    }
  };
  const getTopic = async (topicId: number) => {
    try {
      console.log('ok ' + topicId);
    } catch (error) {
      console.log(error);
    }
  };
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
        const data = await forumAPI.postTopic(topic);
        const topicRes = data.data.topic;
        const topics = [...state.topics, topicRes];
        dispatch({ type: POST_TOPIC, payload: topics });
      } else if (topicData.requestType === 'edit topic') {
        await forumAPI.updateTopic(topic);
        getForum();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = () => {
    dispatch({ type: GET_TOPIC, payload: posts });
  };
  const openNavbar = () => {
    dispatch({ type: NAVBAR_OPEN });
  };
  const closeNavbar = () => {
    dispatch({ type: NAVBAR_CLOSE });
  };

  useEffect(() => {
    getCategories();
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <ForumContext.Provider
      value={{
        ...state,
        getCategories,
        getCategory,
        getForum,
        getTopic,
        postTopic,
        openNavbar,
        closeNavbar,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export const useForumContext = () => {
  return useContext(ForumContext);
};
