import styled from 'styled-components';
import { Paginator, TopicItem, Loader, ItemAction } from '../components';
import { useGeneralContext } from '../context/generalContext';
import { useForumContext } from '../context/forumContext';
import { useFormItemContext } from '../context/formItemContext';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const ForumPage = () => {
  const navigate = useNavigate();
  const { isLoading, pages, pathId, totalItems } = useGeneralContext();
  const { forum, deleteForum } = useForumContext();
  const { id, name, description } = forum;
  const { isAuth } = useUserContext();
  const { openModalForum, setFormItem } = useFormItemContext();
  const newTopicHandler = () => {
    setFormItem({
      id: parseInt(pathId),
      name: '',
      description: '',
      action: 'new',
      type: 'topic',
    });
    openModalForum();
  };
  const editHandler = () => {
    setFormItem({
      id,
      name,
      description,
      action: 'edit',
      type: 'forum',
    });
    openModalForum();
  };
  return (
    <WrapForum>
      <div className='nav-forum'>
        <div>
          {isAuth && <button onClick={newTopicHandler}>New Topic</button>}
        </div>

        <div className='nav-links'>
          <span>{totalItems} topics</span>
          {pages > 1 && <Paginator />}
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='forum-content'>
          <header>
            <div>{forum.name}</div>
            <div>
              <ItemAction
                onEdit={editHandler}
                onDelete={() => {
                  deleteForum(id);
                  navigate('/');
                }}
                creatorId={forum.creator?._id}
                type={'forum'}
              />
            </div>
          </header>
          <ul>
            {forum.topics?.length > 0 ? (
              forum.topics.map((topic) => (
                <TopicItem key={topic.id} {...topic} />
              ))
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
      flex-wrap: wrap;
      gap: 0.5rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: var(--color-white-bg-transparent);
    }
  }
`;

export default ForumPage;
