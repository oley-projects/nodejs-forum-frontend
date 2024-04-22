import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFormItemContext } from '../context/formItemContext';
import { useUserContext } from '../context/userContext';
import SearchInput from './SearchInput';
import { useGeneralContext } from '../context/generalContext';

interface NavlinksPropsType {
  openModalLogin: () => void;
  openModalSignup: () => void;
}

const Navlinks = () => {
  const { openModalLogin, openModalSignup }: NavlinksPropsType =
    useFormItemContext();
  const { logoutUser, isAuth } = useUserContext();
  const { forumType } = useGeneralContext();

  return (
    <WrapNav>
      {forumType !== 'results' && (
        <li>
          <SearchInput searchType='post' />
        </li>
      )}
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
            <Link to='/memberlist/1'>my profile</Link>
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
  @media (max-width: 960px) {
    padding: 0.5rem 1.5rem 1rem;
    flex-direction: column;
    gap: 1rem;
    background: var(--color-white-transparent);
  }
`;

export default Navlinks;
