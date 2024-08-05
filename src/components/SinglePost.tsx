import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TimeViewer from './TimeViewer';

interface ISinglePostType {
  id: number;
  topic: { name: string; id: number; forum: { id: string; name: string } };
  description: string;
  creator: { name: string; id: string };
  createdAt: number;
  isLastPosts?: boolean | undefined;
}

const SinglePost = ({
  topic,
  creator,
  description,
  createdAt,
  isLastPosts,
}: ISinglePostType) => {
  return (
    <WrapSinglePost>
      <header>
        <Link to={`/viewtopic/${topic?.id}`} className='inline-link'>
          {topic?.name}
        </Link>
      </header>
      <div>
        by&nbsp;
        <Link to={`/memberlist/${creator?.id}`} className='inline-link'>
          {creator?.name}
        </Link>
      </div>
      {!isLastPosts && <div>{description}</div>}
      <div>
        <TimeViewer date={createdAt} />
      </div>
      <div>
        <Link to={`/viewforum/${topic?.forum.id}`} className='inline-link'>
          {topic?.forum.name}
        </Link>
      </div>
    </WrapSinglePost>
  );
};

const WrapSinglePost = styled.div`
  padding: 1rem 2rem;
  transition: background 0.3s ease;
  &:hover,
  &:active {
    background: var(--color-white);
  }
`;

export default SinglePost;
