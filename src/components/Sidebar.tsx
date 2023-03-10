import { ReactNode } from 'react';
import styled from 'styled-components';

interface ISidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: ISidebarProps) => {
  return (
    <WrapSidebar>
      <h5>New posts</h5>
      {children}
    </WrapSidebar>
  );
};

const WrapSidebar = styled.aside``;

export default Sidebar;
