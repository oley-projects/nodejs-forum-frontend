import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { usePostsContext } from '../context/postsContext';

interface NavlinksPropsType {
  openModalLogin: () => void;
  openModalSignup: () => void;
}

const Navlinks = () => {
  const { openModalLogin, openModalSignup }: NavlinksPropsType =
    usePostsContext();

  return (
    <WrapNav>
      <li>
        <input type='text' />
        <Link to='results' className='search-btn'>
          <IoMdSearch size={'1.75rem'} />
        </Link>
      </li>
      <li>
        <Link to='#' onClick={openModalLogin}>
          login
        </Link>
      </li>
      <li>
        <Link to='#' onClick={openModalSignup}>
          signup
        </Link>
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
  .search-btn {
    padding: 0;
    line-height: 0;
  }
  @media (max-width: 960px) {
    padding: 0.5rem 1.5rem 1rem;
    flex-direction: column;
    gap: 1rem;
    background: var(--color-white-transparent);
  }
`;

export default Navlinks;
