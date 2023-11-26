import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import categoryReducer from '../reducers/generalReducer';
import { useGeneralContext } from './generalContext';
import { useTopicContext } from './topicContext';
import { SET_CATEGORY, SET_CATEGORIES } from '../actions/actions';
import { forumAPI } from '../api/api';

interface ICategoryProps {
  children: ReactNode;
}

export type TCategoryContext = {
  getCategories: () => void;
  getCategory: (id: number, page?: number, limit?: number) => void;
  postCategory: (args: {}) => void;
  deleteCategory: (postId: number) => void;
  category: { name: string };
  categories: [
    {
      //_id: string;
      id: number;
      name: string;
      description: string;
      //creator: { _id: string; name: string };
      //createdAt: string;
      forums: [{ id: number; name: string; topics: [] }];
      //views: string;
      //lastPostUser: string;
      //lastPostCreatedAt: string;
    }
  ];
};

const initialState = {
  categories: [],
  category: {},
};

const CategoryContext = React.createContext({} as TCategoryContext);

export const CategoryProvider = ({ children }: ICategoryProps) => {
  const {
    setIsLoading,
    setTotalItems,
    setCurrentPage,
    totalItems,
    pageSize,
    currentPage,
    isLoading,
    initialLoad,
    forumType,
  } = useGeneralContext();
  const { topics } = useTopicContext();
  const [state, dispatch]: any = useReducer<any>(categoryReducer, initialState);
  const pages = Math.ceil(totalItems / pageSize);
  const getCategories = async () => {
    if (!isLoading) {
      setIsLoading(true);
    }
    try {
      const data = await forumAPI.getCategories();
      const categories = data.data.categories;
      setCategories(categories);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const setCategories = (categories: []) =>
    dispatch({ type: SET_CATEGORIES, payload: categories });
  const getCategory = async (
    categoryId: number,
    page?: number,
    limit?: number
  ) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await forumAPI.getTopic(categoryId, page, limit);
      const { totalItems, category } = data.data;
      //setTopicPosts(posts);
      setCategory(category);
      setTotalItems(totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const setCategory = (category: {}) =>
    dispatch({ type: SET_CATEGORY, payload: category });
  /* const setCategoryTopics = (topics: []) =>
    dispatch({ type: SET_CATEGORY_TOPICS, payload: topics }); */
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
          setCurrentPage(pages + 1);
          getCategory(category.id, pages + 1);
        } else {
          setCurrentPage(pages);
          getCategory(category.id, pages);
        }
      } else if (categoryData.requestType === 'edit category') {
        await forumAPI.updateCategory(category);
        getCategory(category.id, currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCategory = async (categoryId: number) => {
    try {
      // await forumAPI.deleteCategory(categoryId);
      if (currentPage > 1 && topics.length === 1) {
        setCurrentPage(currentPage - 1);
        getCategory(categoryId, currentPage - 1);
      } else {
        getCategory(categoryId, currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (initialLoad && !isLoading && !forumType) {
      getCategories();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        ...state,
        getCategories,
        getCategory,
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
