// import { useEffect } from 'react';
import styled from 'styled-components';
import { useGeneralContext } from '../context/generalContext';

const Paginator = () => {
  const { currentPage, pages, setCurrentPage } = useGeneralContext();
  const pageArr = Array.from(Array(pages).keys());

  const prevHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextHandler = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const pageHandler = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <WrapPaginator>
      <li>
        <button onClick={prevHandler}>{'<'}</button>
      </li>
      {pageArr.map((p) =>
        (p < 5 && currentPage < 4) ||
        (p > pages - 6 && currentPage > pages - 3) ? (
          <li key={p}>
            <button
              className={p + 1 === currentPage ? 'current-page' : ''}
              onClick={() => pageHandler(p + 1)}
            >
              {p + 1}
            </button>
          </li>
        ) : (p > 1 && currentPage - p > 2) ||
          (p < pages - 1 &&
            p - currentPage > 0 &&
            p !== pages - 2 &&
            currentPage < pages - 3) ? (
          <></>
        ) : p === pages - 2 && currentPage < pages - 3 && pages > 7 ? (
          <span>...</span>
        ) : p === 1 && currentPage - p > 3 && pages > 7 ? (
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
