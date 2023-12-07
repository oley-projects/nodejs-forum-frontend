import { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { useTopicContext } from '../context/topicContext';
import { useForumContext } from '../context/forumContext';
import { useCategoryContext } from '../context/categoryContext';
import { useFormItemContext } from '../context/formItemContext';
import { stringCapitalize } from '../utils/utils';

interface IState {
  id: number;
  name: string;
  description: string;
  action: string;
  type: string;
}

const FormItem = ({ id, type, action, name, description }: IState) => {
  const { postTopic } = useTopicContext();
  const { postForum } = useForumContext();
  const { postCategory } = useCategoryContext();
  const { closeModalForum } = useFormItemContext();
  const [itemData, setItemData] = useState({
    id,
    name,
    description,
    type,
    action,
  });
  const setFormDataHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const requestType = action + ' ' + type;
    const postData: { [key: string]: Function } = {
      postTopic,
      postForum,
      postCategory,
    };
    closeModalForum();
    // Dynamic function call, depent on forum type
    await postData['post' + stringCapitalize(type)]({ itemData, requestType });
  };
  const inputOnchange = (e: React.ChangeEvent<any>) => {
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
              placeholder={`Enter ${type} name`}
              value={itemData.name || ''}
              onChange={inputOnchange}
            />
          </div>
          <div className='input'>
            <label htmlFor='desc'>{type} Description:</label>
            <textarea
              id='desc'
              name='description'
              placeholder={`${stringCapitalize(type)} description`}
              required
              value={itemData.description || ''}
              onChange={inputOnchange}
            />
          </div>
          <div className='btn-panel'>
            <button onClick={setFormDataHandler}>
              {stringCapitalize(action)} {type}
            </button>
            <button onClick={closeModalForum}>Cancel</button>
          </div>
        </form>
      </WrapModal>
    </Modal>
  );
};

const WrapModal = styled.div`
  label {
    display: block;
    text-transform: capitalize;
  }
  textarea {
    min-height: 14rem;
    max-height: 40rem;
  }
  button {
    max-width: 6rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: var(--radius);
    line-height: 1.4rem;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
  }
  .btn-panel {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  @media (min-width: 960px) {
    width: 35rem;
    .input input {
      width: 100%;
    }
  }
`;

export default FormItem;
