import styled from 'styled-components';
import ItemAction from './ItemAction';

interface ITopicPostItemProps {
  user: string;
  postCount: string;
  joined: string;
  location: string;
  topic: string;
  createdAt: string;
  content: string;
  signature: string;
}

const TopicPostItem = ({
  user,
  postCount,
  joined,
  location,
  topic,
  createdAt,
  content,
  signature,
}: ITopicPostItemProps) => {
  return (
    <WrapTopicPostItem
      className='grid-table-item'
      style={{ paddingTop: '0', paddingBottom: '0' }}
    >
      <div className='user-details'>
        <div>{user}</div>
        <div>Posts: {postCount}</div>
        <div>Joined: {joined}</div>
        <div>Location: {location}</div>
      </div>
      <div className='post-details'>
        <div>{topic}</div>
        <div>{createdAt}</div>
        <div>{content}</div>
        <div>{signature}</div>{' '}
        <div className='post-detail-action' style={{ marginTop: '0.5rem' }}>
          <ItemAction onEdit={() => {}} onDelete={() => {}} creatorId='' />
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
