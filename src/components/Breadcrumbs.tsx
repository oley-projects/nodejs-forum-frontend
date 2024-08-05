import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiChevronRight } from 'react-icons/bi';

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  let path = pathname.split('/')[1];
  if (path === 'memberlist') {
    path = 'members';
  }
  return (
    <WrapBreadcrumbs>
      <Link to='/' className='link'>
        Forum
      </Link>
      <span className='icon'>
        <BiChevronRight size={'1.2rem'} />
      </span>
      <span className='text'>{path}</span>
    </WrapBreadcrumbs>
  );
};

const WrapBreadcrumbs = styled.div`
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
  .link {
    padding: 0;
    background: transparent;
    color: var(--color-dark-background);
    &:hover {
      background: transparent;
      color: var(--color-primary);
    }
  }
  .icon {
    line-height: 1;
  }
  .text {
    letter-spacing: var(--spacing);
    color: var(--color-black);
    text-transform: capitalize;
  }
  @media (min-width: 960px) {
    padding-left: 3rem;
  }
`;

export default Breadcrumbs;
