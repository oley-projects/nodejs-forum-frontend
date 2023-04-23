import { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { useForumContext } from '../context/forumContext';

interface IState {
  name: string;
  description: string;
}

const NewTopic = () => {
  const { closeModalNewTopic, postTopic } = useForumContext();
  const [topic, setTopic] = useState({ name: '', description: '' });
  const createTopicHandler = (e: any) => {
    e.preventDefault();
    postTopic(topic);
    closeModalNewTopic();
  };
  const topicOnchange = (e: React.ChangeEvent<any>) => {
    setTopic(
      (prevState) =>
        ({ ...prevState, [e.target.name]: e.target.value } as Pick<
          IState,
          keyof IState
        >)
    );
  };
  return (
    <Modal closeHandler={closeModalNewTopic}>
      <WrapModal>
        <header className='text-center'>
          <h3>New Topic</h3>
        </header>
        <form>
          <div className='input'>
            <label htmlFor='text'>Topic Name:</label>
            <input
              type='text'
              id='text'
              name='name'
              required
              placeholder='Enter topic name'
              value={topic.name || ''}
              onChange={topicOnchange}
            />
          </div>
          <div className='input'>
            <label htmlFor='desc'>Topic Description:</label>
            <textarea
              id='desc'
              name='description'
              placeholder='Topic description'
              required
              value={topic.description || ''}
              onChange={topicOnchange}
            />
          </div>
          <button onClick={createTopicHandler}>Create Topic</button>
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

export default NewTopic;
