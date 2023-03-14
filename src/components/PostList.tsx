import SinglePost from './SinglePost';
import { usePostsContext } from '../context/postsContext';

const PostList = () => {
  const { posts } = usePostsContext();
  return (
    <>
      {posts.map((post, idx) =>
        idx < 10 ? <SinglePost key={post.id} {...post} /> : null
      )}
    </>
  );
};
export default PostList;
