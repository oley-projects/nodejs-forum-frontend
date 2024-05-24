import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import userReducer from '../reducers/userReducer';
import { useGeneralContext } from './generalContext';
import { forumAPI } from '../api/api';
import { SET_USER, SET_VIEWED_USER, SET_IS_AUTH } from '../actions/actions';

interface IUserProps {
  children: ReactNode;
}

export interface IUser {
  id: string;
  userId: string;
  email: string;
  name: string;
  rank: string;
  role: string;
  createdAt: string;
  location: string;
  birthday: string;
  image: string;
  [key: string]: string;
}

export interface IUserContext {
  getUser: (userId: number) => void;
  signupUser: (formData: {}) => void;
  loginUser: (formData: {}) => void;
  logoutUser: () => void;
  updateUser: (user: {}) => void;
  deleteUser: (user: {}) => void;
  user: IUser;
  viewedUser: IUser;
  isAuth: boolean;
}

let initUser = {};
let currentUser = '' as IUser | any;
if (localStorage.getItem('user')) {
  currentUser = JSON.parse(localStorage.getItem('user') || '');
}

if (currentUser !== '') {
  initUser = currentUser;
}

const initialState = {
  user: initUser,
  isAuth: currentUser !== '' ? true : false,
};

const UserContext = React.createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProps) => {
  const [state, dispatch]: any = useReducer(userReducer, initialState);
  const { setIsLoading } = useGeneralContext();
  const setUser = (user: {}) => {
    dispatch({ type: SET_USER, payload: user });
  };
  const signupUser = async (user: {}) => {
    try {
      dispatch(setIsLoading(true));
      await forumAPI.signUp(user);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const loginUser = async (user: {}) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await forumAPI.login(user);
      setUser(data);
      dispatch({ type: SET_IS_AUTH, payload: true });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const logoutUser = () => {
    setUser({});
    dispatch({ type: SET_IS_AUTH, payload: false });
    localStorage.removeItem('user');
  };
  const updateUser = async (user: { id: string }) => {
    try {
      dispatch(setIsLoading(true));
      const tempUser = {
        id: state.user.id,
        name: state.user.name,
        rank: state.user.rank,
        location: state.user.location || '',
      };
      await forumAPI.updateUser({ ...tempUser, ...user });
      setUser({ ...state.user, ...user });
      localStorage.setItem('user', JSON.stringify({ ...state.user, ...user }));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const deleteUser = async (userId: string) => {
    try {
      dispatch(setIsLoading(true));
      await forumAPI.deleteUser(userId);
      setUser({});
      localStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const getUser = async (userId: number) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await forumAPI.requestUser(userId);
      setViewedUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const setViewedUser = (user: {}) =>
    dispatch({ type: SET_VIEWED_USER, payload: user });
  useEffect(() => {
    if (currentUser !== '' && !state.user) {
      setUser(currentUser);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <UserContext.Provider
      value={{
        ...state,
        getUser,
        setUser,
        signupUser,
        loginUser,
        logoutUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
