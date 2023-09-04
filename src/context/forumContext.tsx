import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import forumReducer from '../reducers/forumReducer';
import {
  SET_CATEGORIES,
  SET_CATEGORY,
  SET_FORUM,
  SET_TOPIC,
  SET_TOPIC_POSTS,
  LOADING_TRUE,
  LOADING_FALSE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  SET_TOTAL_ITEMS,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  INITIAL_LOAD,
} from '../actions/actions';
import { forumAPI } from '../api/api';

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

interface IForumProps {
  children: ReactNode;
}

export type TForumContext = {
  getCategories: () => void;
  getCategory: () => void;
  getForum: (name: string, page?: number, limit?: number) => void;
  getTopic: (id: number, page?: number, limit?: number) => void;
  postTopic: (args: {}) => void;
  deleteTopic: (id: number) => void;
  getPost: (args: number) => void;
  postPost: (args: {}) => void;
  deletePost: (id: number) => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  setPageSize: (args: number) => void;
  setCurrentPage: (args: number) => void;
  setTotalItems: (args: number) => void;
  setInitialLoad: () => void;
  isNavbarOpen: boolean;
  isLoading: boolean;
  categories: [{ id: number; name: string }];
  topic: { name: string };
  topics: [
    {
      _id: string;
      id: number;
      name: string;
      description: string;
      creator: { _id: string; name: string };
      createdAt: string;
      replies: string;
      views: string;
      lastPostUser: string;
      lastPostCreatedAt: string;
    }
  ];
  posts: [
    {
      id: number;
      name: string;
      description: string;
      topic: { _id: string; name: string };
      creator: { _id: string; name: string };
      createdAt: string;
    }
  ];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  initialLoad: boolean;
};

const initialState = {
  categories: [],
  forums: [],
  topics: [],
  posts: [],
  topic: {},
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
  initialLoad: true,
};

const ForumContext = React.createContext({} as TForumContext);

export const ForumProvider = ({ children }: IForumProps) => {
  const [state, dispatch]: any = useReducer<any>(forumReducer, initialState);
  const pages = Math.ceil(state.totalItems / state.pageSize);
  const { pathname } = useLocation();
  const type = pathname.split('/')[1].slice(4);
  const pathId = parseInt(pathname.split('/')[2]);

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
  const getTopic = async (topicId: number, page?: number, limit?: number) => {
    try {
      const data = await forumAPI.getTopic(topicId, page, limit);
      const { totalItems, posts, topic } = data.data;
      setTopicPosts(posts);
      setTopic(topic);
      setTotalItems(totalItems);
    } catch (error) {
      console.log(error);
    }
  };
  const setTopic = (topic: {}) => dispatch({ type: SET_TOPIC, payload: topic });
  const setTopicPosts = (posts: []) =>
    dispatch({ type: SET_TOPIC_POSTS, payload: posts });
  const postTopic = async (topicData: {
    itemData: { id: number; name: string; description: string };
    requestType: string;
  }) => {
    const topic = {
      id: topicData.itemData.id,
      name: topicData.itemData.name,
      description: topicData.itemData.description,
    };
    const pageCount = Math.ceil(state.totalItems / state.pageSize);
    try {
      if (topicData.requestType === 'new topic') {
        await forumAPI.postTopic(topic);
        if (state.totalItems % state.pageSize === 0) {
          setCurrentPage(pageCount + 1);
          getForum('topics', pageCount + 1);
        } else {
          setCurrentPage(pageCount);
          getForum('topics', pageCount);
        }
      } else if (topicData.requestType === 'edit topic') {
        await forumAPI.updateTopic(topic);
        getForum('topics', state.currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTopic = async (topicId: number) => {
    if (
      state.totalItems % state.pageSize === 0 &&
      state.totalItems >= 1 &&
      state.currentPage === pages
    ) {
      setCurrentPage(state.currentPage - 1);
    }
    await forumAPI.deleteTopic(topicId);
    if (state.currentPage > 1 && state.topics.length === 1) {
      setCurrentPage(state.currentPage - 1);
      getForum('topics', state.currentPage - 1);
    } else {
      getForum('topics', state.currentPage);
    }
  };
  // const getPosts = () => dispatch({ type: SET_TOPIC, payload: posts });
  const getPost = (postId: number) => {
    try {
      console.log('ok ' + postId);
    } catch (error) {
      console.log(error);
    }
  };
  const postPost = async (postData: {
    itemData: { id: number; name: string; description: string };
    requestType: string;
  }) => {
    const post = {
      id: postData.itemData.id,
      name: postData.itemData.name,
      description: postData.itemData.description,
    };
    try {
      if (postData.requestType === 'new post') {
        await forumAPI.postPost(post);
      } else if (postData.requestType === 'edit post') {
        await forumAPI.updateTopic(post);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (postId: number) => {
    await forumAPI.deletePost(postId);
  };

  const openNavbar = () => dispatch({ type: NAVBAR_OPEN });
  const closeNavbar = () => dispatch({ type: NAVBAR_CLOSE });
  const setTotalItems = (totalItems: number) =>
    dispatch({ type: SET_TOTAL_ITEMS, payload: totalItems });

  const setCurrentPage = (page: number) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: page });
  };
  const setPageSize = (page: number) =>
    dispatch({ type: SET_PAGE_SIZE, payload: page });
  const setInitialLoad = () => dispatch({ type: INITIAL_LOAD });

  useEffect(() => {
    if (state.initialLoad) {
      if (type === 'forum') {
        getForum('topics');
      } else if (type === 'topic' && pathId) {
        getTopic(pathId);
      } else {
        getCategories();
      }
      // getPosts();
    }

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
        getPost,
        postPost,
        deletePost,
        openNavbar,
        closeNavbar,
        setCurrentPage,
        setPageSize,
        setTotalItems,
        setInitialLoad,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export const useForumContext = () => {
  return useContext(ForumContext);
};
