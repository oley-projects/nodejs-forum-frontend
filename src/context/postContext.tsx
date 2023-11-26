import React, { ReactNode, useContext, useReducer } from 'react';
import generalReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';
import { SET_POST } from '../actions/actions';
import { forumAPI } from '../api/api';

export type TPostContext = {
  getPost: (args: number) => void;
  postPost: (args: {}) => void;
  deletePost: (postId: number) => void;
  post: { name: string };
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
};

interface IPostProps {
  children: ReactNode;
}

const initialState = {
  posts: [],
  post: {},
};

const PostContext = React.createContext({} as TPostContext);

export const PostProvider = ({ children }: IPostProps) => {
  const {
    setIsLoading,
    setCurrentPage,
    pageSize,
    totalItems,
    currentPage,
    isLoading,
  } = useGeneralContext();
  const [state, dispatch]: any = useReducer<any>(generalReducer, initialState);
  const pages = Math.ceil(totalItems / pageSize);

  const getPost = async (postId: number, page?: number, limit?: number) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await forumAPI.getTopic(postId, page, limit);
      const { post } = data.data;
      setPost(post);
    } catch (error) {
      console.log(error);
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
          getPost(post.id, pages + 1);
        } else {
          setCurrentPage(pages);
          getPost(post.id, pages);
        }
      } else if (postData.requestType === 'edit topic') {
        await forumAPI.updateTopic(post);
        getPost(post.id, currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (postId: number) => {
    try {
      await forumAPI.deletePost(postId);
      if (currentPage > 1 && state.topics.length === 1) {
        setCurrentPage(state.currentPage - 1);
        getPost(postId, currentPage - 1);
      } else {
        getPost(postId, currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
