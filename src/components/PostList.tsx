import SinglePost from './SinglePost';
import { useForumContext } from '../context/forumContext';

const PostList = () => {
  const { posts } = useForumContext();
  return (
    <>
      {posts.map((post, idx) =>
        idx < 10 ? <SinglePost key={post.id} {...post} /> : null
      )}
    </>
  );
};
export default PostList;
