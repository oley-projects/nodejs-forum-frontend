import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import forumReducer from '../reducers/forumReducer';
import {
  GET_CATEGORIES,
  GET_FORUMS,
  GET_TOPICS,
  POST_TOPIC,
  GET_POSTS,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
  MODAL_SIGNUP_OPEN,
  MODAL_SIGNUP_CLOSE,
  MODAL_NEWTOPIC_OPEN,
  MODAL_NEWTOPIC_CLOSE,
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

interface ForumProps {
  children: ReactNode;
}

type TForumContext = {
  getCategories: () => void;
  getForums: () => void;
  getTopics: () => void;
  postTopic: (args: {}) => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  openModalLogin: () => void;
  closeModalLogin: () => void;
  openModalSignup: () => void;
  closeModalSignup: () => void;
  openModalNewTopic: () => void;
  closeModalNewTopic: () => void;
  isModalLoginOpen: boolean;
  isModalSignupOpen: boolean;
  isModalNewTopic: boolean;
  isNavbarOpen: boolean;
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
  isNavbarOpen: false,
  isModalLoginOpen: false,
  isModalSignupOpen: false,
  isModalNewTopic: false,
  isLoading: false,
};

const ForumContext = React.createContext({} as TForumContext);

export const ForumProvider = ({ children }: ForumProps) => {
  const [state, dispatch] = useReducer(forumReducer, initialState);
  const getCategories = async () => {
    const data = await forumAPI.getCategories();
    const categories = data.data.categories;
    dispatch({ type: GET_CATEGORIES, payload: categories });
  };
  const getForums = () => {
    dispatch({ type: GET_FORUMS, payload: forums });
  };
  const getTopics = async () => {
    const data = await forumAPI.getTopics();
    const topics = data.data.topics;
    dispatch({ type: GET_TOPICS, payload: topics });
  };
  const postTopic = async (topicData: {}) => {
    const data = await forumAPI.postTopic(topicData);
    const topics = [...state.topics, data.data.topic];
    dispatch({ type: POST_TOPIC, payload: topics });
  };
  const getPosts = () => {
    dispatch({ type: GET_POSTS, payload: posts });
  };
  const openNavbar = () => {
    dispatch({ type: NAVBAR_OPEN });
  };
  const closeNavbar = () => {
    dispatch({ type: NAVBAR_CLOSE });
  };
  const openModalLogin = () => {
    dispatch({ type: MODAL_LOGIN_OPEN });
  };
  const closeModalLogin = () => {
    dispatch({ type: MODAL_LOGIN_CLOSE });
  };
  const openModalSignup = () => {
    dispatch({ type: MODAL_SIGNUP_OPEN });
  };
  const closeModalSignup = () => {
    dispatch({ type: MODAL_SIGNUP_CLOSE });
  };
  const openModalNewTopic = () => {
    dispatch({ type: MODAL_NEWTOPIC_OPEN });
  };
  const closeModalNewTopic = () => {
    dispatch({ type: MODAL_NEWTOPIC_CLOSE });
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
        getForums,
        getTopics,
        postTopic,
        openNavbar,
        closeNavbar,
        openModalLogin,
        closeModalLogin,
        openModalSignup,
        closeModalSignup,
        openModalNewTopic,
        closeModalNewTopic,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export const useForumContext = () => {
  return useContext(ForumContext);
};
