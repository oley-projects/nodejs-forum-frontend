import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import forumReducer from '../reducers/forumReducer';
import {
  SET_CATEGORIES,
  SET_CATEGORY,
  SET_FORUM,
  SET_TOPIC,
  POST_TOPIC,
  LOADING_TRUE,
  LOADING_FALSE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  SET_TOTAL_ITEMS,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
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

export type TForumContext = {
  getCategories: () => void;
  getCategory: () => void;
  getForum: (name: string, page?: number, limit?: number) => void;
  getTopic: (args: number) => void;
  postTopic: (args: {}) => void;
  deleteTopic: (args: number) => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  setPageSize: (args: number) => void;
  setCurrentPage: (args: number) => void;
  setTotalItems: (args: number) => void;
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
  totalItems: number;
  currentPage: number;
  pageSize: number;
};

const initialState = {
  categories: [],
  forums: [],
  topics: [],
  posts: [],
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
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
      dispatch({ type: SET_CATEGORIES, payload: categories });
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = () => {
    dispatch({ type: SET_CATEGORY, payload: forums });
  };
  const getForum = async (name: string, page?: number, limit?: number) => {
    if (!state.isLoading) dispatch({ type: LOADING_TRUE });
    try {
      const data = await forumAPI.getData(name, page, limit);
      const { totalItems, topics } = data.data;
      setForum(topics);
      setTotalItems(totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: LOADING_FALSE });
    }
  };
  const setForum = (topics: {}) =>
    dispatch({ type: SET_FORUM, payload: topics });
  const getTopic = (topicId: number) => {
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
        const pages = Math.ceil(state.totalItems / state.pageSize);

        if (state.totalItems % state.pageSize > 0) {
          if (state.currentPage >= pages) {
            const topics = [...state.topics, topicRes];
            dispatch({ type: POST_TOPIC, payload: topics });
          } else {
            setCurrentPage(pages);
          }
        } else {
          setCurrentPage(pages + 1);
        }
      } else if (topicData.requestType === 'edit topic') {
        await forumAPI.updateTopic(topic);
        getForum('topics');
        if (state.totalItems % state.pageSize === 1) {
          setCurrentPage(state.currentPage - 1);
        }
      } else if (topicData.requestType === 'delete topic') {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTopic = async (topicId: number) => {
    await forumAPI.deleteTopic(topicId);
    getForum('topics');
  };
  const getPosts = () => dispatch({ type: SET_TOPIC, payload: posts });
  const openNavbar = () => dispatch({ type: NAVBAR_OPEN });
  const closeNavbar = () => dispatch({ type: NAVBAR_CLOSE });
  const setTotalItems = (totalItems: number) =>
    dispatch({ type: SET_TOTAL_ITEMS, payload: totalItems });

  const setCurrentPage = (page: number) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: page });
  };
  const setPageSize = (page: number) =>
    dispatch({ type: SET_PAGE_SIZE, payload: page });

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
        deleteTopic,
        openNavbar,
        closeNavbar,
        setCurrentPage,
        setPageSize,
        setTotalItems,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export const useForumContext = () => {
  return useContext(ForumContext);
};
