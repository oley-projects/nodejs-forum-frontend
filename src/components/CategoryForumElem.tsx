import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ICatForumElemProps {
  id: number;
  name: string;
  description: string;
  topics: string;
  posts: string;
  lastTopic: string;
  lastUser: string;
  lastPostDate: string;
}

const CategoryForumElem = ({
  id,
  name,
  description,
  topics,
  posts,
  lastTopic,
  lastUser,
  lastPostDate,
}: ICatForumElemProps) => {
  return (
    <WrapCatTopicEl>
      <div>
        <Link className='inline-link' to={`/viewforum/${id}`}>
          {name}
        </Link>
        <div>{description}</div>
      </div>
      <div className='total-stats'>
        <div>{topics}</div>
        <div>Topics</div>
      </div>
      <div className='total-stats'>
        <div>{posts}</div>
        <div>Posts</div>
      </div>
      <div>
        <div>
          <Link className='inline-link' to={`/viewtopic/1`}>
            {lastTopic}
          </Link>
        </div>
        <div>by {lastUser}</div>
        <div>at {lastPostDate}</div>
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
    gap: 2rem;
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
    //margin: 0 auto;
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
