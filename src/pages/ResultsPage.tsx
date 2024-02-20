import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGeneralContext } from '../context/generalContext';
import { usePostContext } from '../context/postContext';
import { Paginator, PostList } from '../components';
import { Loader } from '../components';
import SearchInput from '../components/SearchInput';

const ResultsPage = () => {
  const { foundPosts, getFoundPosts } = usePostContext();
  const { isLoading, pages, totalItems } = useGeneralContext();
  const [searchSorting, setSearchSorting] = useState('date desc');
  const ascDesc = searchSorting.split(' ')[1];
  const { pathname } = useLocation();
  const searchQuery = pathname.split('/')[2].slice(2);
  const secectSortingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchSorting(e.target.value);
  };
  useEffect(() => {
    if (searchQuery && !foundPosts.length) {
      getFoundPosts(searchQuery, 1, 10, 'desc');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div>
        <h4 style={{ marginBottom: '1.5rem' }}>Results</h4>
        <select
          name='search_sorting'
          defaultValue='date desc'
          onChange={secectSortingHandler}
        >
          <option value='date asc'>Date (ascending)</option>
          <option value='date desc'>Date (descending)</option>
          <option value='name asc'>Text (ascending)</option>
          <option value='name desc'>Text (descending)</option>
        </select>
        <select name='search_type' defaultValue='post'>
          <option value='post'>Post</option>
          <option value='topic'>Topic</option>
          <option value='user'>User</option>
        </select>
        <SearchInput ascDesc={ascDesc} />
      </div>
      <div>Total {totalItems} posts found</div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PostList posts={foundPosts} />
          {pages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Paginator />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default ResultsPage;
