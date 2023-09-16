import { useEffect } from 'react';
import styled from 'styled-components';
import { useForumContext } from '../context/forumContext';

const Paginator = ({ name, id }: { name: string; id: number }) => {
  const {
    totalItems,
    currentPage,
    pageSize,
    setCurrentPage,
    getForum,
    getTopic,
    initialLoad,
  } = useForumContext();
  const pageCount = Math.ceil(totalItems / pageSize);
  const pages = Array.from(Array(pageCount).keys());

  const getData = (name: string, id: number, currentPage: number) => {
    if (name === 'topics') {
      getForum(name, currentPage);
    } else if (name === 'topic') {
      getTopic(id, currentPage);
    }
  };

  const prevHandler = () => {
    if (currentPage > 1) {
      getData(name, id || 0, currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };
  const nextHandler = () => {
    if (currentPage < pageCount) {
      getData(name, id || 0, currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };
  const pageHandler = (page: number) => {
    getData(name, id || 0, page);
    setCurrentPage(page);
  };
  useEffect(() => {
    if (!initialLoad) {
      if (name === 'topics') {
        getForum(name, currentPage);
      } else if (name === 'topic') {
        getTopic(id, currentPage);
      }
      getData(name, id, currentPage);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <WrapPaginator>
      <li>
        <button onClick={prevHandler}>{'<'}</button>
      </li>
      {pages.map((p) =>
        (p < 5 && currentPage < 4) ||
        (p > pageCount - 6 && currentPage > pageCount - 3) ? (
          <li key={p}>
            <button
              className={p + 1 === currentPage ? 'current-page' : ''}
              onClick={() => pageHandler(p + 1)}
            >
              {p + 1}
            </button>
          </li>
        ) : (p > 1 && currentPage - p > 2) ||
          (p < pageCount - 1 &&
            p - currentPage > 0 &&
            p !== pageCount - 2 &&
            currentPage < pageCount - 3) ? (
          <></>
        ) : p === pageCount - 2 &&
          currentPage < pageCount - 3 &&
          pageCount > 7 ? (
          <span>...</span>
        ) : p === 1 && currentPage - p > 3 && pageCount > 7 ? (
          <span>...</span>
        ) : (
          <li key={p}>
            <button
              className={p + 1 === currentPage ? 'current-page' : ''}
              onClick={() => pageHandler(p + 1)}
            >
              {p + 1}
            </button>
          </li>
        )
      )}

      <li>
        <button onClick={nextHandler}>{'>'}</button>
      </li>
    </WrapPaginator>
  );
};

const WrapPaginator = styled.div`
  display: flex;
  gap: 0.5rem;
  .current-page {
    color: #333;
  }
`;

export default Paginator;
