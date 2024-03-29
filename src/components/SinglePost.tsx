import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ISinglePostType {
  id: number;
  topic: { name: string; id: number };
  description: string;
  creator: { name: string };
  createdAt: string;
}

const SinglePost = ({
  topic,
  creator,
  description,
  createdAt,
}: ISinglePostType) => {
  return (
    <WrapSinglePost>
      <header>
        <Link to={`/viewtopic/${topic?.id}`} className='inline-link'>
          {topic?.name}
        </Link>
      </header>
      <div>by {creator?.name}</div>
      <div>{description}</div>
      <div>{createdAt}</div>
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
