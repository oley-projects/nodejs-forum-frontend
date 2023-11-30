import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Category } from '../components';
import { useCategoryContext } from '../context/categoryContext';

const CategoryPage = () => {
  const { pathname } = useLocation();
  const categoryId = parseInt(pathname.split('/')[2]);
  const { getCategory, category } = useCategoryContext();

  useEffect(() => {
    getCategory(categoryId);
    // eslint-disable-next-line
  }, []);

  return (
    <Category
      id={categoryId}
      name={category.name}
      description={category.description}
      creator={category.creator}
      forums={category.forums}
    />
  );
};
export default CategoryPage;
