import { Link } from 'react-router-dom';
import Navlinks from './Navlinks';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useGeneralContext } from '../context/generalContext';

const Navbar = () => {
  const { openNavbar, closeNavbar, isNavbarOpen } = useGeneralContext();
  return (
    <WrappedNav className='header'>
      <div className='nav-header'>
        <button>
          <Link to='/' style={{ padding: '0.7rem' }}>
            home
          </Link>
        </button>
      </div>
      <div className='nav-toggle'>
        {!isNavbarOpen ? (
          <button className='nav-toggle' onClick={openNavbar}>
            <FaBars size={'1.75rem'} />
          </button>
        ) : (
          <button className='nav-toggle' onClick={closeNavbar}>
            <AiOutlineClose size={'1.75rem'} />
          </button>
        )}
      </div>
      <div className='nav-links'>
        <Navlinks />
      </div>
    </WrappedNav>
  );
};

const WrappedNav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--box-shadow-bottom);
  z-index: 10;
  .nav-links {
    display: none;
    @media (min-width: 960px) {
      display: block;
    }
  }

  @media (min-width: 960px) {
    .nav-toggle {
      display: none;
    }
  }
`;

export default Navbar;
