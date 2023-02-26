import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  return (
    <WrappedNav>
      <div className='nav-header'>
        <button>
          <Link to='/'>home</Link>
        </button>
      </div>
      <div className='nav-toggle'>
        <button className='nav-toggle'>
          <FaBars size={'1.75rem'} />
        </button>
      </div>
      <ul className='nav-links'>
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
      </ul>
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
  .nav-links {
    display: none;
  }

  @media (min-width: 960px) {
    .nav-toggle {
      display: none;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
        display: flex;
        align-items: center;
      }
    }
  }
`;

export default Navbar;
