import React, {
  ReactNode,
  useContext,
  useReducer /*, useEffect*/,
} from 'react';
import generalReducer from '../reducers/generalReducer';
/*import { useLocation } from 'react-router-dom';
import {
  SET_FORUM,
  SET_TOPIC,
  SET_TOPIC_POSTS,
} from '../actions/actions';
import { forumAPI } from '../api/api';*/

interface IForumProps {
  children: ReactNode;
}

export type TForumContext = {
  forum: { name: string };
  /*getCategories: () => void;
  getCategory: () => void;
  getForum: (name: string, page?: number, limit?: number) => void;
  postForum: (args: {}) => void;
  deleteForum: (forumId: number) => void;
  getTopic: (id: number, page?: number, limit?: number) => void;
  postTopic: (args: {}) => void;
  deleteTopic: (postId: number) => void;
  getPost: (args: number) => void;
  postPost: (args: {}) => void;
  deletePost: (postId: number) => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  setPageSize: (args: number) => void;
  setCurrentPage: (args: number) => void;
  setTotalItems: (args: number) => void;
  setInitialLoad: (initialLoad: boolean) => void;
  setIsPostEdit: (isPostEdit: boolean) => void;
  isNavbarOpen: boolean;
  isLoading: boolean;
  isPostEdit: boolean;
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
      posts: [];
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
  initialLoad: boolean;*/
};

const initialState = {
  forum: {},
  /*categories: [],
  topics: [],
  posts: [],
  topic: {},
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
  initialLoad: true,
  isPostEdit: false,*/
};

const ForumContext1 = React.createContext({} as TForumContext);

export const ForumProvider1 = ({ children }: IForumProps) => {
  const [state /*, dispatch*/]: any = useReducer<any>(
    generalReducer,
    initialState
  );
  /*const pages = Math.ceil(state.totalItems / state.pageSize);
  const { pathname } = useLocation();
  const type = pathname.split('/')[1].slice(4);
  const pathId = parseInt(pathname.split('/')[2]); */

  /* const getCategories = async () => {
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
  const setForum = (topics: []) =>
    dispatch({ type: SET_FORUM, payload: topics });
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
        if (state.totalItems % state.pageSize === 0) {
          setCurrentPage(pages + 1);
          getForum('topics', pages + 1);
        } else {
          setCurrentPage(pages);
          getForum('topics', pages);
        }
      } else if (forumData.requestType === 'edit topic') {
        await forumAPI.updateTopic(forum);
        getForum('topics', state.currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteForum = async (forumId: number) => {
    try {
      await forumAPI.deleteTopic(forumId);
      if (state.currentPage > 1 && state.forums.length === 1) {
        setCurrentPage(state.currentPage - 1);
        getForum('topics', state.currentPage - 1);
      } else {
        getForum('topics', state.currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTopic = async (topicId: number, page?: number, limit?: number) => {
    if (!state.isLoading) dispatch({ type: LOADING_TRUE });
    try {
      const data = await forumAPI.getTopic(topicId, page, limit);
      const { totalItems, posts, topic } = data.data;
      setTopicPosts(posts);
      setTopic(topic);
      setTotalItems(totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: LOADING_FALSE });
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
    try {
      if (topicData.requestType === 'new topic') {
        await forumAPI.postTopic(topic);
        if (state.totalItems % state.pageSize === 0) {
          setCurrentPage(pages + 1);
          getForum('topics', pages + 1);
        } else {
          setCurrentPage(pages);
          getForum('topics', pages);
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
    try {
      await forumAPI.deleteTopic(topicId);
      if (state.currentPage > 1 && state.topics.length === 1) {
        setCurrentPage(state.currentPage - 1);
        getForum('topics', state.currentPage - 1);
      } else {
        getForum('topics', state.currentPage);
      }
    } catch (error) {
      console.log(error);
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
        if (state.totalItems % state.pageSize === 0) {
          setCurrentPage(pages + 1);
          getTopic(pathId, pages + 1);
        } else {
          setCurrentPage(pages);
          getTopic(pathId, pages);
        }
      } else if (postData.requestType === 'edit post') {
        await forumAPI.updatePost(post);
        getTopic(pathId, state.currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (postId: number) => {
    try {
      await forumAPI.deletePost(postId);
      if (state.currentPage > 1 && state.posts.length === 1) {
        setCurrentPage(state.currentPage - 1);
        getTopic(pathId, state.currentPage - 1);
      } else {
        getTopic(pathId, state.currentPage);
      }
    } catch (error) {
      console.log(error);
    }
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
  const setInitialLoad = (initialLoad: boolean) =>
    dispatch({ type: SET_INITIAL_LOAD, payload: initialLoad });
  const setIsPostEdit = (isPostEdit: boolean) =>
    dispatch({ type: SET_IS_POST_EDIT, payload: isPostEdit });

  useEffect(() => {
    if (state.initialLoad && !state.isLoading) {
      if (type === 'forum') {
        if (state.currentPage > 1) {
          setCurrentPage(1);
        }
        getForum('topics');
      } else if (type === 'topic' && pathId) {
        if (state.currentPage > 1) {
          setCurrentPage(1);
        }
        getTopic(pathId);
      } else {
        getCategories();
      }
      // getPosts();
    }
    // eslint-disable-next-line
  }, [type]);*/

  return (
    <ForumContext1.Provider
      value={{
        ...state,
        /*getCategories,
        getCategory,
        getForum,
        postForum,
        deleteForum,
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
        setIsPostEdit,*/
      }}
    >
      {children}
    </ForumContext1.Provider>
  );
};

export const useForumContext1 = () => {
  return useContext(ForumContext1);
};
