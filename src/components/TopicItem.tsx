import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFormItemContext } from '../context/formItemContext';
import { useGeneralContext } from '../context/generalContext';
import { useTopicContext } from '../context/topicContext';
import { useUserContext } from '../context/userContext';
import TimeViewer from './TimeViewer';
import ItemAction from './ItemAction';
import { FaRegFile } from 'react-icons/fa';
import { useState } from 'react';

interface ITopicItemProps {
  id: number;
  name: string;
  description: string;
  creator: { _id: string; id: string; name: string };
  createdAt: number;
  posts: [];
  views: number;
  lastPost?: {
    creator: { _id: string; id: string; name: string };
    createdAt: number;
  };
}
const TopicItem = ({
  id,
  name,
  description,
  creator,
  createdAt,
  posts,
  views,
  lastPost,
}: ITopicItemProps) => {
  const { openModalForum, setFormItem } = useFormItemContext();
  const { deleteTopic } = useTopicContext();
  const { forumType } = useGeneralContext();
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
      type: 'topic',
    });
    openModalForum();
  };
  return (
    <WrapTopicItem
      className='grid-table-item'
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className='folder-icon'>
        <FaRegFile />
      </div>
      <div className='main-item'>
        <div>
          <div>
            <Link className='inline-link' to={`/viewtopic/${id}`}>
              {name}
            </Link>
          </div>
          <div>
            by&nbsp;
            <Link className='inline-link' to={`/memberlist/${creator.id}`}>
              {creator.name}
            </Link>
            , <TimeViewer date={createdAt} />
          </div>
        </div>
        {forumType !== 'results' && (
          <div className={`box ${isHovered ? 'op-1' : 'op-0'}`}>
            <ItemAction
              onEdit={editHandler}
              onDelete={() => deleteTopic(id)}
              creatorId={creator._id}
              type={'topic'}
            />
          </div>
        )}
      </div>
      <div className='align-center'>
        <div>{posts?.length || 0} Replies</div>
        <div>{views} Views</div>
      </div>
      <div className='align-right'>
        {lastPost ? (
          <>
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
          </>
        ) : (
          <div>No replies</div>
        )}
      </div>
    </WrapTopicItem>
  );
};

const WrapTopicItem = styled.li`
  &:hover .folder-icon {
    background-color: var(--color-white-transparent);
  }
  @media (min-width: 641px) {
    grid-template-columns: 4rem 3.5fr 1.2fr 2.3fr;
    column-gap: 1.5rem;
    row-gap: 0.5rem;
    & > div {
      padding: 1rem;
    }
    .align-center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .align-right {
      display: flex;
      flex-direction: column;
      align-items: end;
      div:last-child {
        text-align: right;
      }
    }
    .folder-icon {
      justify-content: center;
    }
    .main-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      gap: 1rem;
      .box {
        max-width: 8rem;
        transition: opacity 0.3s ease;
      }
    }
  }
  @media (min-width: 800px) {
    grid-template-columns: 4rem 4fr 1fr 2fr;
    column-gap: 2rem;
    row-gap: 1rem;
  }
  @media (max-width: 640px) {
    padding-bottom: 1.5rem;
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

export default TopicItem;
