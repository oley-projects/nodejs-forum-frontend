import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { links } from '../utils/constants';

const Navbar = () => {
  return (
    <WrappedNav>
      <ul className='nav-links'>
        {links.map((link) => {
          const { id, text, url } = link;
          return (
            <li key={id}>
              <Link to={url}>{text}</Link>
            </li>
          );
        })}
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
  align-items: center;
  justify-content: center;

  @media (min-width: 960px) {
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
      }
    }
  }
`;

export default Navbar;
