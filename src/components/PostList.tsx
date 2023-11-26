import SinglePost from './SinglePost';
import { usePostContext } from '../context/postContext';

const PostList = () => {
  const { posts } = usePostContext();
  return (
    <>
      {posts.map((post, idx) =>
        idx < 10 ? <SinglePost key={post.id} {...post} /> : null
      )}
    </>
  );
};
export default PostList;
