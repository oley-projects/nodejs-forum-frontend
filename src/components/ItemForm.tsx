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

  const stringCapitalize = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const createTopicHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const requestType = action + ' ' + type;
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
              placeholder={`Enter ${type} name`}
              value={itemData.name || ''}
              onChange={topicOnchange}
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
              onChange={topicOnchange}
            />
          </div>
          <div className='btn-panel'>
            <button onClick={createTopicHandler}>
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
