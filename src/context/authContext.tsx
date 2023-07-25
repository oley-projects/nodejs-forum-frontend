import React, { ReactNode, useContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import { forumAPI } from '../api/api';
import {
  SET_USER,
  LOADING_USER_TRUE,
  LOADING_USER_FALSE,
} from '../actions/actions';

interface IAuthProps {
  children: ReactNode;
}
interface IAuthContext {
  signupUser: (formData: {}) => void;
  loginUser: (formData: {}) => void;
}

const initialState = {
  user: {},
  isLoading: false,
};

const AuthContext = React.createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProps) => {
  const [state, dispatch]: any = useReducer<any>(authReducer, initialState);

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
      const requestUser = await forumAPI.login(user);
      setUser(requestUser);
    } catch (error) {
      console.log(error);
    } finally {
      loadingUserFalse();
    }
    console.log(state.user);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUser,
        loadingUserTrue,
        loadingUserFalse,
        signupUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
