import styled from 'styled-components';

interface ICatTopicElemProps {
  id: number;
  name: string;
  description: string;
  topics: string;
  posts: string;
  lastTopic: string;
  lastUser: string;
  lastPostDate: string;
}

const CategoryTopicElem = ({
  id,
  name,
  description,
  topics,
  posts,
  lastTopic,
  lastUser,
  lastPostDate,
}: ICatTopicElemProps) => {
  return (
    <WrapCatTopicEl>
      <div>
        <div>{name}</div>
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
        <div>{lastTopic}</div>
        <div>by {lastUser}</div>
        <div>at {lastPostDate}</div>
      </div>
    </WrapCatTopicEl>
  );
};
const WrapCatTopicEl = styled.div`
  padding: 0.6rem 1rem;
  @media (min-width: 641px) {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr 2fr;
    gap: 2rem;
    align-items: center;
  }

  @media (max-width: 640px) {
    & > div:not(:last-of-type) {
      margin-bottom: 1rem;
    }
    .total-stats {
      display: flex;
      gap: 1rem;
    }
  }
`;

export default CategoryTopicElem;
