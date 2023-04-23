// import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ItemAction, Paginator, TopicPostItem } from '../components';

const TopicPage = () => {
  // const { pathname } = useLocation();
  const topicPosts = [
    {
      id: 1,
      user: 'User',
      postCount: '12',
      joined: new Date().toLocaleString().split(',')[0],
      location: 'UK',
      topic: 'topic 1',
      createdAt: new Date().toLocaleString(),
      content: `Post text of topic 1, created at ${new Date().toLocaleString()}`,
      signature: 'User signature',
    },
    {
      id: 2,
      user: 'User1',
      postCount: '15',
      joined: new Date().toLocaleString().split(',')[0],
      location: 'CA',
      topic: 'topic 1',
      createdAt: new Date().toLocaleString(),
      content: `Second post text of topic 1, created at ${new Date().toLocaleString()}`,
      signature: 'User1 signature',
    },
    {
      id: 3,
      user: 'User2',
      postCount: '2',
      joined: new Date().toLocaleString().split(',')[0],
      location: 'US',
      topic: 'topic 1',
      createdAt: new Date().toLocaleString(),
      content: `Third text of topic 1, created at ${new Date().toLocaleString()}`,
      signature: 'User2 signature',
    },
    {
      id: 4,
      user: 'User1',
      postCount: '15',
      joined: new Date().toLocaleString().split(',')[0],
      location: 'CA',
      topic: 'topic 1',
      createdAt: new Date().toLocaleString(),
      content: `Nexd text of topic 1, created at ${new Date().toLocaleString()}`,
      signature: 'User1 signature',
    },
    {
      id: 5,
      user: 'User',
      postCount: '12',
      joined: new Date().toLocaleString().split(',')[0],
      location: 'UK',
      topic: 'topic 1',
      createdAt: new Date().toLocaleString(),
      content: `Last text of topic 1, created at ${new Date().toLocaleString()}`,
      signature: 'User signature',
    },
  ];

  return (
    <WrapTopicPage>
      <header className='header-post'>
        <button>Reply</button>
        <div className='nav-post'>
          <ItemAction onEdit={() => {}} onDelete={() => {}} />
          <Paginator />
        </div>
      </header>
      <ul className='content'>
        {topicPosts.map((post) => (
          <TopicPostItem key={post.id} {...post} />
        ))}
      </ul>
      <div className='post-action'>
        <header>
          <div>
            <button>B</button>
            <button>I</button>
            <button>L</button>
          </div>
          <div>
            <button>Preview</button>
          </div>
        </header>
        <textarea />
        <footer>
          <button>Load files</button>
          <button>Send</button>
        </footer>
      </div>
    </WrapTopicPage>
  );
};

const WrapTopicPage = styled.div`
  ul {
    margin: 1rem 0;
    border-radius: var(--radius);
    box-shadow: var(--box-shadow);
  }
  .header-post {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .nav-post {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .post-action {
    margin: 2rem auto;
    width: 100%;
    header,
    footer {
      display: flex;
      justify-content: space-between;
    }
    button {
      padding: 0 0.3rem;
      line-height: 1.5rem;
      border: 0.05rem solid rgba(0, 0, 0, 0.15);
      border-radius: var(--radius);
      transition: border 0.3s ease, color 0.3s ease;
      &:hover {
        border-color: var(--color-primary);
      }
    }
    button:not(:last-child) {
      margin-right: 0.5rem;
    }
    textarea {
      margin: 0.7rem 0 0.3rem;
      padding: 0.5rem;
      min-height: 7rem;
      max-height: 35rem;
    }
    @media (min-width: 640px) {
      width: 80%;
    }
    @media (min-width: 960px) {
      width: 60%;
    }
  }
`;

export default TopicPage;
