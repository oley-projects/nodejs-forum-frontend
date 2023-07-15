import styled from 'styled-components';
import { useForumContext } from '../context/forumContext';

const Paginator = () => {
  const { totalItems, currentPage, pageSize, setCurrentPage } =
    useForumContext();
  const pageCount = Math.ceil(totalItems / pageSize);
  const pages = Array.from(Array(pageCount).keys());
  const prevHandler = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextHandler = () => {
    if (currentPage < pageCount) setCurrentPage(currentPage + 1);
  };
  const pageHandler = (page: number) => {
    setCurrentPage(page);
  };
  console.log(currentPage);
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
        ) : p === pageCount - 2 && currentPage < pageCount - 3 ? (
          <span>...</span>
        ) : p === 1 && currentPage - p > 3 ? (
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
