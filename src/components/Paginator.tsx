import styled from 'styled-components';

const Paginator = () => {
  return (
    <WrapPaginator>
      <li>
        <button>1</button>
      </li>
      <li>
        <button>2</button>
      </li>
      <li>
        <button>{'>'}</button>
      </li>
    </WrapPaginator>
  );
};

const WrapPaginator = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default Paginator;
