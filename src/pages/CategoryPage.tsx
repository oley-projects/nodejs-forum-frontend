import { /*Category, */ Loader } from '../components';
import { useGeneralContext } from '../context/generalContext';
// mport { useCategoryContext } from '../context/categoryContext';

const CategoryPage = () => {
  const { isLoading /*, pathId*/ } = useGeneralContext();
  //  const { category } = useCategoryContext();

  /* useEffect(() => {
    getCategory(pathId);
    // eslint-disable-next-line
  }, []); */

  return isLoading ? (
    <Loader />
  ) : (
    <></>
    // <Category
    //   id={pathId}
    //   name={category.name}
    //   description={category.description}
    //   creator={category.creator}
    //   forums={category.forums}
    // />
  );
};
export default CategoryPage;
