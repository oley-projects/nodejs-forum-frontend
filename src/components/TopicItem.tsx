import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ITopicItemProps {
  id: number;
  name: string;
  createdUser: string;
  createdAt: string;
  replies: string;
  views: string;
  lastPostUser: string;
  lastPostCreatedAt: string;
}

const TopicItem = ({
  id,
  name,
  createdUser,
  createdAt,
  replies,
  views,
  lastPostUser,
  lastPostCreatedAt,
}: ITopicItemProps) => {
  return (
    <WrapTopicItem className='grid-table-item'>
      <div>
        <div>
          <Link className='inline-link' to={`/viewtopic/${id}`}>
            {name}
          </Link>
        </div>
        <div>
          by {createdUser}, {createdAt}
        </div>
      </div>
      <div className='align-center'>
        <div>{replies}</div>
        <div>Replies</div>
      </div>
      <div className='align-center'>
        <div>{views}</div>
        <div>Views</div>
      </div>
      <div className='align-right'>
        <div>by {lastPostUser}</div>
        <div>{lastPostCreatedAt}</div>
      </div>
    </WrapTopicItem>
  );
};

const WrapTopicItem = styled.li`
  @media (min-width: 640px) {
    grid-template-columns: 6fr 1fr 1fr 3fr;
    gap: 1.5rem;
  }
  @media (min-width: 800px) {
    grid-template-columns: 4fr 1fr 1fr 2fr;
    gap: 2rem;
  }
  .align-center {
    @media (min-width: 640px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .align-right {
    @media (min-width: 640px) {
      display: flex;
      flex-direction: column;
      align-items: end;
      div:last-child {
        text-align: right;
      }
    }
  }
`;

export default TopicItem;
