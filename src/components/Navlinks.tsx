import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';

const Navlinks = () => {
  return (
    <WrapNav>
      <li>
        <input type='text' />
        <button>
          <IoMdSearch size={'1.75rem'} />
        </button>
      </li>
      <li>
        <Link to='#'>login</Link>
      </li>
      <li>
        <Link to='#'>signup</Link>
      </li>
    </WrapNav>
  );
};

const WrapNav = styled.ul`
  display: flex;
  justify-content: center;
  li {
    margin: 0 0.5rem;
    display: flex;
    align-items: center;
  }
  @media (max-width: 960px) {
    padding: 0.5rem 1.5rem 1rem;
    flex-direction: column;
    gap: 1rem;
    background: rgba(233, 233, 233, 0.8);
  }
`;

export default Navlinks;
