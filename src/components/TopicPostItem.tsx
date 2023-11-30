import styled from 'styled-components';
import ItemAction from './ItemAction';
import { usePostContext } from '../context/postContext';
import { useGeneralContext } from '../context/generalContext';

interface ITopicPostItemProps {
  /* user: string;
  postCount: string;
  joined: string;
  location: string;
  topic: string;
  createdAt: string;
  content: string;
  signature: string; */
  id: number;
  description: string;
  topic: { name: string };
  creator: { name: string; _id: string };
  createdAt: string;
  setEditPost: React.Dispatch<
    React.SetStateAction<{ id: number; text: string }>
  >;
}

const TopicPostItem = ({
  id,
  description,
  topic,
  creator,
  createdAt,
  setEditPost,
}: ITopicPostItemProps) => {
  const { deletePost } = usePostContext();
  const { isPostEdit, setIsPostEdit } = useGeneralContext();
  const editPostHandler = (id: number) => {
    if (!isPostEdit) {
      setIsPostEdit(true);
    }
    const postData = { id, text: description };
    setEditPost(postData);
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <WrapTopicPostItem
      className='grid-table-item'
      style={{ paddingTop: '0', paddingBottom: '0' }}
    >
      <div className='user-details'>
        <div>{creator.name}</div>
        {/* <div>Posts: {postCount}</div>
        <div>Joined: {joined}</div>
        <div>Location: {location}</div> */}
      </div>
      <div className='post-details'>
        <div>{description}</div>
        <div>{createdAt}</div>
        {/* <div>{signature}</div> */}
        <div className='post-detail-action' style={{ marginTop: '0.5rem' }}>
          <ItemAction
            onEdit={() => editPostHandler(id)}
            onDelete={() => deletePost(id)}
            creatorId={creator._id}
            type={'post'}
          />
        </div>
      </div>
    </WrapTopicPostItem>
  );
};

const WrapTopicPostItem = styled.li`
  & > div {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  @media (max-width: 639px) {
    .user-details {
      border-bottom: 1px solid var(--color-ligth-background);
    }
  }
  @media (min-width: 640px) {
    grid-template-columns: 1fr 3fr;
    .user-details {
      padding-right: 0.5rem;
      border-right: 1px solid var(--color-ligth-background);
    }
    .post-details {
      padding-left: 1rem;
    }
    .post-detail-action {
      @media (min-width: 640px) {
        display: flex;
        justify-content: end;
      }
    }
  }
`;

export default TopicPostItem;
