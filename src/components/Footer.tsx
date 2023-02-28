import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <WrapFooter className='footer centered'>
      <span>
        © All Rights Reserved. <Link to='/terms'>Terms</Link>
      </span>
    </WrapFooter>
  );
};

const WrapFooter = styled.footer`
  height: 5rem;
  a {
    padding: 0;
    letter-spacing: 0;
    color: var(--color-dark-background);
    &:hover {
      background: transparent;
      color: var(--color-black);
    }
  }
`;

export default Footer;
