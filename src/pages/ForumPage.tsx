import styled from 'styled-components';
import { Paginator, TopicItem } from '../components';

const topics = [
  {
    id: 1,
    name: 'Topic 1',
    createdUser: 'User',
    createdAt: `${new Date().toLocaleString()}`,
    replies: '1',
    views: '5',
    lastPostUser: 'User2',
    lastPostCreatedAt: `${new Date().toLocaleString()}`,
  },
  {
    id: 2,
    name: 'Topic 2',
    createdUser: 'User1',
    createdAt: `${new Date().toLocaleString()}`,
    replies: '5',
    views: '15',
    lastPostUser: 'User2',
    lastPostCreatedAt: `${new Date().toLocaleString()}`,
  },
  {
    id: 3,
    name: 'Topic 3',
    createdUser: 'User1',
    createdAt: `${new Date().toLocaleString()}`,
    replies: '2',
    views: '11',
    lastPostUser: 'User1',
    lastPostCreatedAt: `${new Date().toLocaleString()}`,
  },
  {
    id: 4,
    name: 'Topic 4',
    createdUser: 'User',
    createdAt: `${new Date().toLocaleString()}`,
    replies: '3',
    views: '20',
    lastPostUser: 'User1',
    lastPostCreatedAt: `${new Date().toLocaleString()}`,
  },
  {
    id: 5,
    name: 'Topic 5',
    createdUser: 'User1',
    createdAt: `${new Date().toLocaleString()}`,
    replies: '7',
    views: '11',
    lastPostUser: 'User2',
    lastPostCreatedAt: `${new Date().toLocaleString()}`,
  },
  {
    id: 6,
    name: 'Topic 6',
    createdUser: 'User',
    createdAt: `${new Date().toLocaleString()}`,
    replies: '1',
    views: '5',
    lastPostUser: 'User2',
    lastPostCreatedAt: `${new Date().toLocaleString()}`,
  },
  {
    id: 7,
    name: 'Topic 7',
    createdUser: 'User1',
    createdAt: `${new Date().toLocaleString()}`,
    replies: '2',
    views: '7',
    lastPostUser: 'User2',
    lastPostCreatedAt: `${new Date().toLocaleString()}`,
  },
];

const ForumPage = () => {
  return (
    <WrapForum>
      <div className='nav-forum'>
        <div>
          <button>New Topic</button>
        </div>
        <div className='nav-links'>
          <span>{26} topics</span>
          <Paginator />
        </div>
      </div>
      <div className='forum-content'>
        <header>Topics</header>
        <ul>
          {topics.map((topic) => (
            <TopicItem key={topic.id} {...topic} />
          ))}
        </ul>
      </div>
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
      background: var(--color-white-bg-transparent);
    }
  }
`;

export default ForumPage;
