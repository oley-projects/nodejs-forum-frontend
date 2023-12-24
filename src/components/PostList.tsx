import SinglePost from './SinglePost';
import { useCategoryContext } from '../context/categoryContext';

const PostList = () => {
  const { lastPosts } = useCategoryContext();

  return (
    <>
      {lastPosts?.length > 0 &&
        lastPosts?.map((post, idx) =>
          idx < 10 ? <SinglePost key={post.id} {...post} /> : null
        )}
    </>
  );
};
export default PostList;
