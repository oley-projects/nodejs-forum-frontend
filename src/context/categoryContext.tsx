import React, { ReactNode, useContext, useReducer } from 'react';
import categoryReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';
import { SET_CATEGORIES, SET_LAST_POSTS } from '../actions/actions';
import { forumAPI } from '../api/api';

interface ICategoryProps {
  children: ReactNode;
}

export type TCategoryContext = {
  getCategories: (page?: number, limit?: number) => void;
  postCategory: (args: {}) => void;
  deleteCategory: (postId: number) => void;
  categories: [
    {
      id: number;
      name: string;
      description: string;
      creator: { _id: string; name: string };
      forums: [
        {
          id: number;
          name: string;
          description: string;
          creator: { _id: string; name: string };
          topics: [];
          totalPosts: number;
          totalTopics: number;
        }
      ];
    }
  ];
  lastPosts: [
    {
      id: number;
      topic: { name: string; id: number };
      description: string;
      creator: { name: string };
      createdAt: string;
    }
  ];
};

const initialState = {
  categories: [],
  lastPosts: [],
};

const CategoryContext = React.createContext({} as TCategoryContext);

export const CategoryProvider = ({ children }: ICategoryProps) => {
  const {
    setIsLoading,
    setCurrentPage,
    totalItems,
    pageSize,
    currentPage,
    isLoading,
    pages,
  } = useGeneralContext();
  const [state, dispatch]: any = useReducer<any>(categoryReducer, initialState);
  const getCategories = async (page?: number, limit?: number) => {
    if (!isLoading) {
      setIsLoading(true);
    }
    try {
      const data = await forumAPI.getCategories(page, limit);
      const { categories, lastPosts } = data.data;
      setCategories(categories);
      setLastPosts(lastPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const setCategories = (categories: []) =>
    dispatch({ type: SET_CATEGORIES, payload: categories });
  const setLastPosts = (lastPosts: []) =>
    dispatch({ type: SET_LAST_POSTS, payload: lastPosts });
  const postCategory = async (categoryData: {
    itemData: { id: number; name: string; description: string };
    requestType: string;
  }) => {
    const category = {
      id: categoryData.itemData.id,
      name: categoryData.itemData.name,
      description: categoryData.itemData.description,
    };
    try {
      if (categoryData.requestType === 'new category') {
        await forumAPI.postCategory(category);
        if (totalItems % pageSize === 0) {
          getCategories(pages + 1);
          setCurrentPage(pages + 1);
        } else {
          getCategories(pages);
          setCurrentPage(pages);
        }
      } else if (categoryData.requestType === 'edit category') {
        await forumAPI.updateCategory(category);
        getCategories(currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCategory = async (categoryId: number) => {
    try {
      await forumAPI.deleteCategory(categoryId);
      if (currentPage > 1 && state.category.topics.length === 1) {
        setCurrentPage(currentPage - 1);
        getCategories(currentPage - 1);
      } else {
        getCategories(currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        ...state,
        getCategories,
        postCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};
