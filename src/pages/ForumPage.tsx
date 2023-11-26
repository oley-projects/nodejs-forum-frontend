import styled from 'styled-components';
import { Paginator, TopicItem, Loader, ItemAction } from '../components';
import { useGeneralContext } from '../context/generalContext';
import { useTopicContext } from '../context/topicContext';
import { useFormItemContext } from '../context/formItemContext';
import { useAuthContext } from '../context/authContext';

const ForumPage = () => {
  const { isLoading, totalItems, pageSize } = useGeneralContext();
  const { topics } = useTopicContext();
  const { isAuth } = useAuthContext();
  const pageCount = Math.ceil(totalItems / pageSize);
  const { openModalForum, setFormItem } = useFormItemContext();

  const newTopicHandler = () => {
    setFormItem({
      id: 0,
      name: '',
      description: '',
      action: 'new',
      type: 'topic',
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
          {pageCount > 1 && <Paginator name='topics' id={0} />}
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='forum-content'>
          <header>
            <div>Topics</div>
            <div>
              <ItemAction onEdit={() => {}} onDelete={() => {}} creatorId='' />
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
