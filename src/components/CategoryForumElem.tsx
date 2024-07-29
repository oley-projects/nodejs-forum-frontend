import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemAction from './ItemAction';
import { useFormItemContext } from '../context/formItemContext';
import { useForumContext } from '../context/forumContext';
import TimeViewer from './TimeViewer';
import { FaRegFolder } from 'react-icons/fa';

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
      <div className='folder-icon'>
        <FaRegFolder />
      </div>
      <div>
        <Link className='inline-link' to={`/viewforum/${id}`}>
          {name}
        </Link>
      </div>
      <div className='total-stats'>
        {totalTopics > 0 ? (
          <div>{totalTopics} topics</div>
        ) : (
          <div>No topics</div>
        )}
        {totalPosts > 0 && <div>{totalPosts} posts</div>}
      </div>
      <div>
        {lastPost ? (
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
        ) : (
          <div>No posts</div>
        )}
        <div className='box'>
          <ItemAction
            onEdit={editHandler}
            onDelete={() => deleteForum(id)}
            creatorId={creator?._id}
            type={'forum'}
          />
        </div>
      </div>
    </WrapCatTopicEl>
  );
};
const WrapCatTopicEl = styled.div`
  transition: background 0.3s ease;

  &:hover .folder-icon {
    background-color: var(--color-white-transparent);
  }
  .folder-icon {
    display: flex;
    height: 100%;
    align-items: center;
    transition: background 0.3s ease;
  }

  @media (min-width: 641px) {
    display: grid;
    grid-template-columns: 4rem 3.5fr 1.2fr 2.3fr;
    gap: 0.5rem;
    align-items: center;
    & > div {
      padding: 1rem;
    }
    .total-stats {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .folder-icon {
      justify-content: center;
    }
  }
  @media (min-width: 1090px) {
    grid-template-columns: 4rem 4fr 1fr 2fr;
  }

  @media (max-width: 640px) {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
      padding: 0 2rem;
    }
    & > div:not(:last-of-type) {
      margin-bottom: 1rem;
    }
    .total-stats {
      display: flex;
      gap: 0.5rem;
    }
    .folder-icon {
      height: 2rem;
    }
  }
`;

export default CategoryForumElem;
