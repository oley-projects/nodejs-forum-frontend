import { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { useForumContext } from '../context/forumContext';
import { useFormItemContext } from '../context/formItemContext';

interface IState {
  type: string;
  action: string;
  name: string;
  description: string;
}

const FormItem = ({ type, action, name, description }: IState) => {
  const { postTopic } = useForumContext();
  const { closeModalForum } = useFormItemContext();
  const [itemData, setItemData] = useState({ name, description, type, action });
  const createTopicHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const requestType =
      action.toLocaleLowerCase() + ' ' + type.toLocaleLowerCase();
    postTopic({ itemData, requestType });
    closeModalForum();
  };
  const topicOnchange = (e: React.ChangeEvent<any>) => {
    setItemData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Modal closeHandler={closeModalForum}>
      <WrapModal>
        <header className='text-center'>
          <h3>
            {action} {type}
          </h3>
        </header>
        <form>
          <div className='input'>
            <label htmlFor='text'>{type} Name:</label>
            <input
              type='text'
              id='text'
              name='name'
              required
              placeholder={`Enter ${type.toLowerCase()} name`}
              value={itemData.name || ''}
              onChange={topicOnchange}
            />
          </div>
          <div className='input'>
            <label htmlFor='desc'>{type} Description:</label>
            <textarea
              id='desc'
              name='description'
              placeholder={`${type} description`}
              required
              value={itemData.description || ''}
              onChange={topicOnchange}
            />
          </div>
          <button onClick={createTopicHandler}>Create {type}</button>
        </form>
      </WrapModal>
    </Modal>
  );
};

const WrapModal = styled.div`
  label {
    display: block;
  }
  textarea {
    min-height: 14rem;
    max-height: 40rem;
  }
  @media (min-width: 960px) {
    width: 35rem;
    .input input {
      width: 100%;
    }
  }
`;

export default FormItem;
