import React, {
  ReactNode,
  useContext,
  useReducer /*, useEffect*/,
} from 'react';
import { useLocation } from 'react-router-dom';
import generalReducer from '../reducers/generalReducer';
import {
  SET_IS_LOADING,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  SET_TOTAL_ITEMS,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  // SET_INITIAL_LOAD,
  SET_IS_POST_EDIT,
} from '../actions/actions';
// import { forumAPI } from '../api/api';

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
  isNavbarOpen: boolean;
  isLoading: boolean;
  isPostEdit: boolean;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  // initialLoad: boolean;
  pages: number;
  forumType: string;
  pathId: string;
};

const initialState = {
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
  // initialLoad: true,
  isPostEdit: false,
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
  /* const setInitialLoad = (initialLoad: boolean) =>
    dispatch({ type: SET_INITIAL_LOAD, payload: initialLoad }); */
  const setIsPostEdit = (isPostEdit: boolean) =>
    dispatch({ type: SET_IS_POST_EDIT, payload: isPostEdit });
  const setIsLoading = (isLoading: boolean) =>
    dispatch({ type: SET_IS_LOADING, payload: isLoading });
  /*useEffect(() => {
    if (state.currentPage > 1) {
      setCurrentPage(1);
    } // eslint-disable-next-line
  }, [forumType]);*/
  /* useEffect(() => {
    if (state.initialLoad && !state.isLoading) {
      if (forumType === 'categories') {
        if (state.currentPage > 1) {
          setCurrentPage(1);
        }
        getCategories();
      } else if (forumType === 'category' && pathId) {
        if (state.currentPage > 1) {
          setCurrentPage(1);
        }
        getCategory(pathId);
      }
    }
    // eslint-disable-next-line
  }, [forumType]); */
  return (
    <GeneralContext.Provider
      value={{
        ...state,
        pages,
        forumType,
        pathId,
        openNavbar,
        closeNavbar,
        setCurrentPage,
        setPageSize,
        setTotalItems,
        setIsPostEdit,
        setIsLoading,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  return useContext(GeneralContext);
};
