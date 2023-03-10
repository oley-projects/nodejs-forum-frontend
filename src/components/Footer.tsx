import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <WrapFooter className='footer centered'>
      <span>
        © All Rights Reserved.
        <Link to='/terms' className='inline-link'>
          Terms
        </Link>
      </span>
    </WrapFooter>
  );
};

const WrapFooter = styled.footer`
  height: 5rem;
`;

export default Footer;
