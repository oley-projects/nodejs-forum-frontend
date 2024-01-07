import { PostList } from '../components';
import { Loader } from '../components';
import { useGeneralContext } from '../context/generalContext';
import { usePostContext } from '../context/postContext';

const FoundPostsPage = () => {
  const { foundPosts } = usePostContext();
  const { isLoading } = useGeneralContext();
  return (
    <div>
      <h4>FoundPostsPage</h4>
      {isLoading ? <Loader /> : <PostList posts={foundPosts} />}
    </div>
  );
};
export default FoundPostsPage;
