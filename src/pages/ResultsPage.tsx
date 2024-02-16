import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGeneralContext } from '../context/generalContext';
import { usePostContext } from '../context/postContext';
import { Paginator, PostList } from '../components';
import { Loader } from '../components';
import SearchInput from '../components/SearchInput';

const ResultsPage = () => {
  const { foundPosts, getFoundPosts } = usePostContext();
  const { isLoading } = useGeneralContext();
  const { pathname } = useLocation();
  const searchQuery = pathname.split('/')[2].slice(2);
  useEffect(() => {
    if (searchQuery && !foundPosts.length) {
      getFoundPosts(searchQuery, 1, 10);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div>
        <h4 style={{ marginBottom: '1.5rem' }}>Results</h4>
        <select name='search_sort' defaultValue='dateDesc'>
          <option value='dateAsc'>Date (ascending)</option>
          <option value='dateDesc'>Date (descending)</option>
          <option value='nameAsc'>Text (ascending)</option>
          <option value='nameDesc'>Text (descending)</option>
        </select>
        <select name='search_type' defaultValue='post'>
          <option value='post'>Post</option>
          <option value='topic'>Topic</option>
          <option value='user'>User</option>
        </select>
        <SearchInput />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PostList posts={foundPosts} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Paginator />
          </div>
        </>
      )}
    </>
  );
};
export default ResultsPage;
