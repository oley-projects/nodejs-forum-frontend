import styled from 'styled-components';
import { Sidebar, Category, PostList, Loader } from '../components';
import { useGeneralContext } from '../context/generalContext';
import { useCategoryContext } from '../context/categoryContext';
import { useFormItemContext } from '../context/formItemContext';

const HomePage = () => {
  const { isLoading } = useGeneralContext();

  const { categories } = useCategoryContext();
  const { openModalForum, setFormItem } = useFormItemContext();

  const newCategoryHandler = () => {
    setFormItem({
      id: 0,
      name: '',
      description: '',
      action: 'new',
      type: 'category',
    });
    openModalForum();
  };
  return (
    <WrapHome>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            {categories.map((category) => (
              <Category key={category.id} {...category} />
            ))}
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <button onClick={newCategoryHandler}>Add Category</button>
            </div>
          </div>
          <Sidebar>
            <PostList />
          </Sidebar>
        </>
      )}
    </WrapHome>
  );
};

const WrapHome = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 2rem;
  @media (min-width: 960px) {
    grid-template-columns: 3fr 1fr;
    gap: 3rem;
  }
`;

export default HomePage;
