import Navlinks from './Navlinks';
import styled from 'styled-components';
import { useGeneralContext } from '../context/generalContext';

const NavlinksMobile = () => {
  const { isNavbarOpen } = useGeneralContext();
  return (
    <WrapNav className={isNavbarOpen ? 'show-navbar' : ''}>
      <Navlinks />
    </WrapNav>
  );
};

const WrapNav = styled.aside`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  visibility: collapse;
  opacity: 0;
  transform: translateY(-30%);
  transition: var(--transition);
  box-shadow: var(--box-shadow-bottom);
  z-index: 2;
  @media (min-width: 960px) {
    display: none;
  }
`;

export default NavlinksMobile;
