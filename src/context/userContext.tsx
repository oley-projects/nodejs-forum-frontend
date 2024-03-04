import React, { ReactNode, useContext, useReducer, useEffect } from 'react';
import userReducer from '../reducers/userReducer';
import { forumAPI } from '../api/api';
import {
  SET_USER,
  LOADING_USER_TRUE,
  LOADING_USER_FALSE,
  SET_IS_AUTH,
} from '../actions/actions';

interface IUserProps {
  children: ReactNode;
}
interface IUserContext {
  signupUser: (formData: {}) => void;
  loginUser: (formData: {}) => void;
  logoutUser: () => void;
  user: { userId: string };
  isAuth: boolean;
}

let initUser = {};
let currentUser = '';
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
  const [state, dispatch]: any = useReducer<any>(userReducer, initialState);
  const setUser = (user: {}) => {
    dispatch({ type: SET_USER, payload: user });
  };
  const loadingUserTrue = () => {
    dispatch({ type: LOADING_USER_TRUE });
  };
  const loadingUserFalse = () => {
    dispatch({ type: LOADING_USER_FALSE });
  };
  const signupUser = async (user: {}) => {
    try {
      loadingUserTrue();
      await forumAPI.signUp(user);
    } catch (error) {
      console.log(error);
    } finally {
      loadingUserFalse();
    }
  };
  const loginUser = async (user: {}) => {
    try {
      loadingUserTrue();
      const { data } = await forumAPI.login(user);
      setUser(data);
      dispatch({ type: SET_IS_AUTH, payload: true });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    } finally {
      loadingUserFalse();
    }
  };
  const logoutUser = () => {
    setUser({});
    dispatch({ type: SET_IS_AUTH, payload: false });
    localStorage.removeItem('user');
  };
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
        setUser,
        loadingUserTrue,
        loadingUserFalse,
        signupUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
