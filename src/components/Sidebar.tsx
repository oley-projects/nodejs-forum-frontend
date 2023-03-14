import { ReactNode } from 'react';
import styled from 'styled-components';

interface ISidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: ISidebarProps) => {
  return (
    <WrapSidebar>
      <header className='list-header'>
        <h5>New posts</h5>
      </header>
      {children}
    </WrapSidebar>
  );
};

const WrapSidebar = styled.aside`
  margin: 0 auto;
  background: #f3f3f3;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  .list-header {
    padding: 0.5rem 1rem;
    background: #eaeaea;
  }
`;

export default Sidebar;
