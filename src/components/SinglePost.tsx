import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ISinglePostType {
  id: number;
  topic: string;
  user: string;
  createdAt: string;
}

const SinglePost = ({ id, topic, user, createdAt: date }: ISinglePostType) => {
  return (
    <WrapSinglePost>
      <header>
        <Link to={`/viewtopic/${id}`} className='inline-link'>
          {topic}
        </Link>
      </header>
      <div>by {user}</div>
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
