import React, { ReactNode, useContext, useReducer } from 'react';
import formItemReducer from '../reducers/formItemReducer';
import {
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
  MODAL_SIGNUP_OPEN,
  MODAL_SIGNUP_CLOSE,
  MODAL_FORUM_OPEN,
  MODAL_FORUM_CLOSE,
  EDITING_ENABLE,
  EDITING_DISABLE,
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
  editingEnable: () => void;
  editingDisable: () => void;
  isModalLoginOpen: boolean;
  isModalSignupOpen: boolean;
  isModalForumOpen: boolean;
  isEditing: boolean;
  formItem: { name: string; description: string; type: string; action: string };
  setFormItem: (args: {
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
  isEditing: boolean;
  formItem: { name: string; description: string; type: string; action: string };
};

const initialState: TState = {
  formItem: { name: '', description: '', type: '', action: '' },
  isEditing: false,
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
  const editingEnable = () => {
    dispatch({ type: EDITING_ENABLE });
  };
  const editingDisable = () => {
    dispatch({ type: EDITING_DISABLE });
  };
  const setFormItem = (editItem: {
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
        editingEnable,
        editingDisable,
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
