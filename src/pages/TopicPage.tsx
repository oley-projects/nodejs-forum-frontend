import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ItemAction, Paginator, TopicPostItem, Loader } from '../components';
import { useForumContext } from '../context/forumContext';

const TopicPage = () => {
  const {
    topic,
    posts,
    postPost,
    isLoading,
    totalItems,
    pageSize,
    isPostEdit,
    setIsPostEdit,
  } = useForumContext();
  const pageCount = Math.ceil(totalItems / pageSize);
  const [editPost, setEditPost] = useState<{ id: number; text: string }>({
    id: 0,
    text: '',
  });

  const { pathname } = useLocation();
  const topicId = pathname.split('/')[2];
  /* const topicPosts = [
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
  ]; */
  const changePostTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditPost((prev) => ({ ...prev, text: e.target.value }));
  };
  const newPostHandler = () => {
    let requestType;
    let id;
    if (isPostEdit) {
      setIsPostEdit(false);
      requestType = 'edit post';
      id = editPost.id;
    } else {
      requestType = 'new post';
      id = topicId;
    }
    const postData = {
      itemData: { id, name: '', description: editPost.text },
      requestType,
    };
    postPost(postData);
    setEditPost({ id: 0, text: '' });
  };

  return (
    <WrapTopicPage>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className='header-post'>
            <div>{topic.name}</div>
            <div className='nav-post'>
              <ItemAction onEdit={() => {}} onDelete={() => {}} creatorId='' />
              {pageCount > 1 && (
                <Paginator name='topic' id={parseInt(topicId)} />
              )}
            </div>
          </header>
          <ul className='content'>
            {posts.length > 0 ? (
              posts.map((post) => (
                <TopicPostItem
                  key={post.id}
                  {...post}
                  setEditPost={setEditPost}
                />
              ))
            ) : (
              <div>Empty topic</div>
            )}
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
            <textarea value={editPost.text} onChange={changePostTextHandler} />
            <footer>
              <button>Load files</button>
              <button onClick={newPostHandler}>Send</button>
            </footer>
          </div>
        </>
      )}
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
