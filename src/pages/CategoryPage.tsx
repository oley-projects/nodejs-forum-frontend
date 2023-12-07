import { useEffect } from 'react';
import { Category, Loader } from '../components';
import { useGeneralContext } from '../context/generalContext';
import { useCategoryContext } from '../context/categoryContext';

const CategoryPage = () => {
  const { isLoading, pathId } = useGeneralContext();
  const { getCategory, category } = useCategoryContext();

  useEffect(() => {
    getCategory(pathId);
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Category
      id={pathId}
      name={category.name}
      description={category.description}
      creator={category.creator}
      forums={category.forums}
    />
  );
};
export default CategoryPage;
