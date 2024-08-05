import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemAction from './ItemAction';
import { useFormItemContext } from '../context/formItemContext';
import { useForumContext } from '../context/forumContext';
import { useUserContext } from '../context/userContext';
import TimeViewer from './TimeViewer';
import { FaRegFolder } from 'react-icons/fa';
import { useState } from 'react';

interface ICatForumElemProps {
  id: number;
  name: string;
  description: string;
  creator: { _id: string };
  topics: [];
  totalPosts: number;
  totalTopics: number;
  lastPost?: {
    creator: { _id: string; id: string; name: string };
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
  const { isAuth } = useUserContext();
  const [isHovered, setIsHovered] = useState(false);
  const mouseOverHandler = () => {
    if (isAuth) setIsHovered(true);
  };
  const mouseLeaveHandler = () => {
    if (isAuth) setIsHovered(false);
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
    <WrapCatTopicEl
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className='folder-icon'>
        <FaRegFolder />
      </div>
      <div className='main-item'>
        <div>
          <Link className='inline-link' to={`/viewforum/${id}`}>
            {name}
          </Link>
          <div className='description'>{description}</div>
        </div>
        <div className={`action-container ${isHovered ? 'op-1' : 'op-0'}`}>
          <ItemAction
            onEdit={editHandler}
            onDelete={() => deleteForum(id)}
            creatorId={creator?._id}
            type={'forum'}
          />
        </div>
      </div>
      <div className='total-stats'>
        {totalTopics > 0 ? (
          <div>{totalTopics} Topics</div>
        ) : (
          <div>No topics</div>
        )}
        {totalPosts > 0 && <div>{totalPosts} Posts</div>}
      </div>
      <div className='last-grid-column'>
        {lastPost ? (
          <div>
            <div>
              <Link
                className='inline-link'
                to={`/viewtopic/${lastPost?.topic.id}`}
              >
                {lastPost.topic.name}
              </Link>
            </div>
            <div>
              by&nbsp;
              <Link
                className='inline-link'
                to={`/memberlist/${lastPost?.creator.id}`}
              >
                {lastPost?.creator.name}
              </Link>
            </div>
            <div>
              at <TimeViewer date={lastPost?.createdAt} />
            </div>
          </div>
        ) : (
          <div>No posts</div>
        )}
      </div>
    </WrapCatTopicEl>
  );
};
const WrapCatTopicEl = styled.div`
  transition: background 0.3s ease;
  &:hover .folder-icon {
    background-color: var(--color-white-transparent);
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
    .main-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 1rem;
      position: relative;
    }
    .action-container {
      transition: opacity 0.3s ease;
      max-width: 8rem;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  @media (min-width: 1090px) {
    grid-template-columns: 4rem 4fr 1fr 2fr;
  }

  @media (max-width: 640px) {
    padding-bottom: 1.5rem;
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
      height: 3rem;
    }
    &:hover .folder-icon,
    &:focus .folder-icon,
    &:active .folder-icon {
      background-color: var(--color-white-transparent);
    }
  }
`;

export default CategoryForumElem;
