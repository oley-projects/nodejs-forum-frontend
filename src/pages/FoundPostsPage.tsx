import { PostList } from '../components';
import { usePostContext } from '../context/postContext';

const FoundPostsPage = () => {
  const { foundPosts } = usePostContext();
  return (
    <div>
      <h4>FoundPostsPage</h4>
      <PostList posts={foundPosts} />
    </div>
  );
};
export default FoundPostsPage;
