import React, { ReactNode, useContext, useEffect, useReducer } from 'react';
import generalReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';
import { useSearchContext } from './searchContext';
import { useCategoryContext } from './categoryContext';
import { useForumContext } from './forumContext';
import { useTopicContext } from './topicContext';
import { SET_POST } from '../actions/actions';
import { forumAPI } from '../api/api';
import { errorHandler } from '../utils/utils';

export type TPostContext = {
  getPost: (args: number) => void;
  postPost: (args: {}) => void;
  deletePost: (postId: number) => void;
  post: { name: string };
};

interface IPostProps {
  children: ReactNode;
}

const initialState = {
  post: {},
  foundPosts: [],
};

const PostContext = React.createContext({} as TPostContext);

export const PostProvider = ({ children }: IPostProps) => {
  const [state, dispatch]: any = useReducer<any>(generalReducer, initialState);
  const {
    setIsLoading,
    setCurrentPage,
    pageSize,
    totalItems,
    currentPage,
    isLoading,
    initialLoad,
    pages,
    pathId,
    forumType,
    isError,
    errorType,
    errorText,
    setIsError,
    setErrorType,
    setErrorText,
  } = useGeneralContext();
  const { getFoundResults, typeResults, sortResults } = useSearchContext();
  const { getCategories } = useCategoryContext();
  const { getForum } = useForumContext();
  const { getTopic, topic } = useTopicContext();
  const getPost = async (postId: number) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await forumAPI.getPost(postId);
      const { post } = data.data;
      setPost(post);
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
  const setPost = (post: {}) => dispatch({ type: SET_POST, payload: post });
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
        if (totalItems % pageSize === 0) {
          setCurrentPage(pages + 1);
          getTopic(topic.id, pages + 1);
        } else {
          setCurrentPage(pages);
          getTopic(topic.id, pages);
        }
      } else if (postData.requestType === 'edit post') {
        await forumAPI.updatePost(post);
        getTopic(topic.id, currentPage);
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
  const deletePost = async (postId: number) => {
    try {
      await forumAPI.deletePost(postId);
      if (currentPage > 1 && topic.posts.length === 1) {
        setCurrentPage(state.currentPage - 1);
        getTopic(topic.id, currentPage - 1);
      } else {
        getTopic(topic.id, currentPage);
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

  useEffect(() => {
    const pathQuery = pathId ? pathId.slice(2) : '';
    if (!isLoading && forumType === 'categories') {
      getCategories();
    }
    if (!isLoading && forumType === 'forum' && pathId) {
      getForum(parseInt(pathId), currentPage);
    }
    if (!isLoading && forumType === 'topic' && pathId) {
      getTopic(parseInt(pathId), currentPage);
    }
    if (!isLoading && !initialLoad && forumType === 'results' && pathQuery) {
      getFoundResults(
        pathQuery,
        typeResults,
        sortResults,
        currentPage,
        pageSize
      );
    }
    // eslint-disable-next-line
  }, [forumType, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line
  }, [forumType]);

  return (
    <PostContext.Provider
      value={{
        ...state,
        getPost,
        postPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
