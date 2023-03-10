import { Link } from 'react-router-dom';

interface ISinglePostType {
  text: string;
}

const SinglePost = ({ text }: ISinglePostType) => {
  return (
    <div>
      <header>
        <Link to='#' className='inline-link'>
          {text}
        </Link>
      </header>
    </div>
  );
};
export default SinglePost;
