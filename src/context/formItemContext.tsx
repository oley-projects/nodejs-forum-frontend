import React, { ReactNode, useContext, useReducer } from 'react';
import formItemReducer from '../reducers/formItemReducer';
import {
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
  MODAL_SIGNUP_OPEN,
  MODAL_SIGNUP_CLOSE,
  MODAL_FORUM_OPEN,
  MODAL_FORUM_CLOSE,
  SET_FORM_ITEM,
} from '../actions/actions';

interface IFormItemProps {
  children: ReactNode;
}

type TFormItemContext = {
  openModalLogin: () => void;
  closeModalLogin: () => void;
  openModalSignup: () => void;
  closeModalSignup: () => void;
  openModalForum: () => void;
  closeModalForum: () => void;
  isModalLoginOpen: boolean;
  isModalSignupOpen: boolean;
  isModalForumOpen: boolean;
  formItem: {
    id: number;
    name: string;
    description: string;
    type: string;
    action: string;
  };
  setFormItem: (args: {
    id: number;
    name: string;
    description: string;
    action: string;
    type: string;
  }) => void;
};

export type TState = {
  isModalLoginOpen: boolean;
  isModalSignupOpen: boolean;
  isModalForumOpen: boolean;
  formItem: {
    id: number;
    name: string;
    description: string;
    type: string;
    action: string;
  };
};

const initialState: TState = {
  formItem: { id: 0, name: '', description: '', type: '', action: '' },
  isModalLoginOpen: false,
  isModalSignupOpen: false,
  isModalForumOpen: false,
};

const FormItemContext = React.createContext({} as TFormItemContext);

export const FormItemProvider = ({ children }: IFormItemProps) => {
  const [state, dispatch]: any = useReducer<any>(formItemReducer, initialState);
  const openModalLogin = () => {
    dispatch({ type: MODAL_LOGIN_OPEN });
  };
  const closeModalLogin = () => {
    dispatch({ type: MODAL_LOGIN_CLOSE });
  };
  const openModalSignup = () => {
    dispatch({ type: MODAL_SIGNUP_OPEN });
  };
  const closeModalSignup = () => {
    dispatch({ type: MODAL_SIGNUP_CLOSE });
  };
  const openModalForum = () => {
    dispatch({ type: MODAL_FORUM_OPEN });
  };
  const closeModalForum = () => {
    dispatch({ type: MODAL_FORUM_CLOSE });
  };
  const setFormItem = (editItem: {
    id: number;
    name: string;
    description: string;
    action: string;
    type: string;
  }) => {
    dispatch({
      type: SET_FORM_ITEM,
      payload: editItem,
    });
  };
  return (
    <FormItemContext.Provider
      value={{
        ...(state as TState),
        openModalLogin,
        closeModalLogin,
        openModalSignup,
        closeModalSignup,
        openModalForum,
        closeModalForum,
        setFormItem,
      }}
    >
      {children}
    </FormItemContext.Provider>
  );
};

export const useFormItemContext = () => {
  return useContext(FormItemContext);
};
