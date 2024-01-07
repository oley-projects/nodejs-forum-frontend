import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { useFormItemContext } from '../context/formItemContext';
import { useAuthContext } from '../context/authContext';
import { usePostContext } from '../context/postContext';

interface NavlinksPropsType {
  openModalLogin: () => void;
  openModalSignup: () => void;
}

const Navlinks = () => {
  const { openModalLogin, openModalSignup }: NavlinksPropsType =
    useFormItemContext();
  const { getFoundPosts } = usePostContext();
  const { logoutUser, isAuth } = useAuthContext();
  const [inputValue, setInputValue] = useState('');
  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const searchHandler = () => {
    getFoundPosts(inputValue, 1, 10);
    setInputValue('');
  };
  return (
    <WrapNav>
      <li>
        <input type='text' value={inputValue} onChange={onchangeHandler} />
        <Link
          to={`search/q=${inputValue}`}
          onClick={searchHandler}
          className='search-btn'
        >
          <IoMdSearch size={'1.75rem'} />
        </Link>
      </li>
      {!isAuth ? (
        <>
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
        </>
      ) : (
        <>
          <li>
            <Link to='#' onClick={logoutUser}>
              logout
            </Link>
          </li>
          <li>
            <Link to='#'>my profile</Link>
          </li>
        </>
      )}
    </WrapNav>
  );
};

const WrapNav = styled.ul`
  display: flex;
  justify-content: space-between;
  li {
    margin-left: 1rem;
    display: flex;
    align-items: center;
  }
  .search-btn {
    margin-left: 0.4rem;
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
