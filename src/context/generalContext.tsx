import React, { ReactNode, useContext, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import generalReducer from '../reducers/generalReducer';

import {
  SET_IS_LOADING,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  SET_TOTAL_ITEMS,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  SET_INITIAL_LOAD,
  SET_IS_POST_EDIT,
  SET_IS_ERROR,
  SET_ERROR_TYPE,
  SET_ERROR_TEXT,
} from '../actions/actions';

interface IGeneralProps {
  children: ReactNode;
}

export type TGeneralContext = {
  openNavbar: () => void;
  closeNavbar: () => void;
  setPageSize: (args: number) => void;
  setCurrentPage: (args: number) => void;
  setTotalItems: (args: number) => void;
  setInitialLoad: (initialLoad: boolean) => void;
  setIsPostEdit: (isPostEdit: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentType: (currentType: string) => void;
  setIsError: (isError: boolean) => void;
  setErrorType: (errorType: string) => void;
  setErrorText: (errorText: string) => void;
  isNavbarOpen: boolean;
  isLoading: boolean;
  isPostEdit: boolean;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  initialLoad: boolean;
  pages: number;
  forumType: string;
  pathId: string;
  isError: boolean;
  errorType: 'info' | 'success' | 'warning' | 'error' | 'default';
  errorText: string;
};

const initialState = {
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
  initialLoad: true,
  isPostEdit: false,
  isError: false,
  errorType: 'error',
  errorText: '',
};

const GeneralContext = React.createContext({} as TGeneralContext);

export const GeneralProvider = ({ children }: IGeneralProps) => {
  const [state, dispatch]: any = useReducer<any>(generalReducer, initialState);
  const pages = Math.ceil(state.totalItems / state.pageSize);
  const { pathname } = useLocation();
  const forumType = pathname.split('/')[1].slice(4) || 'categories';
  const pathId = pathname.split('/')[2];
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
  const setIsLoading = (isLoading: boolean) =>
    dispatch({ type: SET_IS_LOADING, payload: isLoading });
  const setIsError = (isError: boolean) =>
    dispatch({ type: SET_IS_ERROR, payload: isError });
  const setErrorType = (errorType: boolean) =>
    dispatch({ type: SET_ERROR_TYPE, payload: errorType });
  const setErrorText = (errorText: boolean) =>
    dispatch({ type: SET_ERROR_TEXT, payload: errorText });

  return (
    <GeneralContext.Provider
      value={{
        ...state,
        pages,
        forumType,
        pathId,
        openNavbar,
        closeNavbar,
        setInitialLoad,
        setCurrentPage,
        setPageSize,
        setTotalItems,
        setIsPostEdit,
        setIsLoading,
        setIsError,
        setErrorType,
        setErrorText,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  return useContext(GeneralContext);
};
