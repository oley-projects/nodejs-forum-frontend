import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from '../components';

const PageLayout = () => {
  return (
    <>
      <Breadcrumbs />
      <Outlet />
    </>
  );
};

export default PageLayout;
