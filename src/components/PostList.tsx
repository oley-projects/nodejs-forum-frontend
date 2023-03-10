import SinglePost from './SinglePost';
import { usePostsContext } from '../context/postsContext';

const PostList = () => {
  const { posts } = usePostsContext();
  return (
    <>
      {posts.map((post) => (
        <SinglePost key={post.id} {...post} />
      ))}
    </>
  );
};
export default PostList;
