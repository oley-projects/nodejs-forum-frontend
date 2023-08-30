import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ISinglePostType {
  id: number;
  topic: string;
  description: string;
  creator: { name: string };
  createdAt: string;
}

const SinglePost = ({
  id,
  topic,
  creator,
  description,
  createdAt: date,
}: ISinglePostType) => {
  return (
    <WrapSinglePost>
      <header>
        <Link to={`/viewtopic/${id}`} className='inline-link'>
          {topic}
        </Link>
      </header>
      <div>by {creator.name}</div>
      <div>{description}</div>
      <div>{date}</div>
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
