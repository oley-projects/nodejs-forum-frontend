import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemAction from './ItemAction';
import { useFormItemContext } from '../context/formItemContext';
import { useForumContext } from '../context/forumContext';
import TimeViewer from './TimeViewer';

interface ICatForumElemProps {
  id: number;
  name: string;
  description: string;
  creator: { _id: string };
  topics: [];
  totalPosts: number;
  totalTopics: number;
  lastPost?: {
    creator: { _id: string; name: string };
    createdAt: number;
    topic: { id: string; name: string };
  };
}

const CategoryForumElem = ({
  id,
  name,
  description,
  creator,
  totalPosts,
  totalTopics,
  lastPost,
}: ICatForumElemProps) => {
  const { deleteForum } = useForumContext();
  const { openModalForum, setFormItem } = useFormItemContext();
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
    <WrapCatTopicEl>
      <div>
        <Link className='inline-link' to={`/viewforum/${id}`}>
          {name}
        </Link>
      </div>
      <div className='total-stats'>
        <div>{totalTopics} topics</div>
        <div>{totalPosts} posts</div>
      </div>
      <div>
        {lastPost && (
          <>
            <div>
              <Link
                className='inline-link'
                to={`/viewtopic/${lastPost?.topic.id}`}
              >
                {lastPost.topic.name}
              </Link>
            </div>
            <div>by {lastPost?.creator.name}</div>
            <div>
              at <TimeViewer date={lastPost?.createdAt} />
            </div>
          </>
        )}
      </div>
      <div className='box'>
        <ItemAction
          onEdit={editHandler}
          onDelete={() => deleteForum(id)}
          creatorId={creator?._id}
          type={'forum'}
        />
      </div>
    </WrapCatTopicEl>
  );
};
const WrapCatTopicEl = styled.div`
  padding: 0.6rem 1rem;
  background: var(--color-white-background);
  transition: background 0.3s ease;
  &:first-child {
    padding-top: 1rem;
  }
  &:last-child {
    padding-bottom: 1rem;
  }
  &:nth-child(even) {
    background: var(--color-white-background-dark);
  }
  &:hover,
  &:active {
    background: var(--color-white);
  }

  @media (min-width: 641px) {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr 2fr;
    gap: 0.5rem;
    align-items: center;
    .total-stats {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div:not(:last-of-type) {
      margin-bottom: 1rem;
    }
    .total-stats {
      display: flex;
      gap: 0.5rem;
    }
  }
`;

export default CategoryForumElem;
