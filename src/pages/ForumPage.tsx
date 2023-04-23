import { useEffect } from 'react';
import styled from 'styled-components';
import { Paginator, TopicItem, Loader, ItemAction } from '../components';
import { useForumContext } from '../context/forumContext';

const ForumPage = () => {
  const { topics, getForum, openModalNewTopic, isLoading } = useForumContext();
  useEffect(
    () => {
      getForum();
    }, // eslint-disable-next-line
    []
  );

  return (
    <WrapForum>
      <div className='nav-forum'>
        <div>
          <button onClick={openModalNewTopic}>New Topic</button>
        </div>
        <div className='nav-links'>
          <span>{26} topics</span>
          <Paginator />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='forum-content'>
          <header>
            <div>Topics</div>
            <div>
              <ItemAction onEdit={() => {}} onDelete={() => {}} />
            </div>
          </header>
          <ul>
            {topics.length > 0 ? (
              topics.map((topic) => <TopicItem key={topic.id} {...topic} />)
            ) : (
              <div className='empty'>Empty forum</div>
            )}
          </ul>
        </div>
      )}
    </WrapForum>
  );
};

const WrapForum = styled.div`
  .nav-forum {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .nav-links {
    display: flex;
    gap: 1rem;
  }
  .forum-content {
    border-radius: var(--radius);
    box-shadow: var(--box-shadow);
    header {
      padding: 0.5rem 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: var(--color-white-bg-transparent);
    }
  }
`;

export default ForumPage;
