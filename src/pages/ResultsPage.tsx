import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGeneralContext } from '../context/generalContext';
import { useSearchContext } from '../context/searchContext';
import { Paginator, PostList, TopicItem, UserList } from '../components';
import { Loader } from '../components';
import SearchInput from '../components/SearchInput';

const ResultsPage = () => {
  const { foundResults, getFoundResults, typeResults } = useSearchContext();
  const { isLoading, pages, totalItems } = useGeneralContext();
  const { sortResults, setSortResults } = useSearchContext();
  const { pathname } = useLocation();
  const searchQuery = pathname.split('/')[2].slice(2);
  const [searchType, setSearchType] = useState('post');
  const selectSortingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortResults(e.target.value);
  };
  const selectTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };
  useEffect(() => {
    if (!isLoading && searchQuery && !foundResults.length) {
      getFoundResults(searchQuery, 'post', 'createdAt_desc', 1, 10);
    }
    if (!isLoading && sortResults !== 'createdAt_desc') {
      setSortResults('createdAt_desc');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div>
        <h4 style={{ marginBottom: '1.5rem' }}>Results</h4>
        <select
          name='search_sorting'
          defaultValue='createdAt_desc'
          onChange={selectSortingHandler}
        >
          <option value='createdAt_asc'>Date (ascending)</option>
          <option value='createdAt_desc'>Date (descending)</option>
          <option value='description_asc'>Text (ascending)</option>
          <option value='description_desc'>Text (descending)</option>
        </select>
        <select
          name='search_type'
          defaultValue='post'
          onChange={selectTypeHandler}
        >
          <option value='post'>Post</option>
          <option value='topic'>Topic</option>
          <option value='user'>User</option>
        </select>
        <SearchInput searchType={searchType} />
      </div>
      <div>
        Total {totalItems} {typeResults}(s) found
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {foundResults.length > 0 && typeResults === 'post' && (
            <PostList posts={foundResults} />
          )}
          {foundResults.length > 0 &&
            typeResults === 'topic' &&
            foundResults?.map((r, i) =>
              i < 10 ? <TopicItem key={r.id} {...r} /> : null
            )}
          {foundResults.length > 0 && typeResults === 'user' && (
            <UserList users={foundResults} />
          )}
          {!foundResults.length && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              No {typeResults}s found
            </div>
          )}
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
