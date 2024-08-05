import styled from 'styled-components';
import { Sidebar, Category, PostList, Loader } from '../components';
import { useGeneralContext } from '../context/generalContext';
import { useCategoryContext } from '../context/categoryContext';
import { useFormItemContext } from '../context/formItemContext';
import { useUserContext } from '../context/userContext';

const HomePage = () => {
  const { isLoading } = useGeneralContext();

  const { categories, lastPosts } = useCategoryContext();
  const { openModalForum, setFormItem } = useFormItemContext();
  const { isAuth } = useUserContext();
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
          <div className='categories'>
            {categories.length > 0 ? (
              categories.map((category) => (
                <Category key={category.id} {...category} />
              ))
            ) : (
              <div className='empty'>Empty forum</div>
            )}
            {isAuth && (
              <div className='add-element pos-left-top'>
                <button onClick={newCategoryHandler}>Add Category</button>
              </div>
            )}
          </div>
          {lastPosts.length > 0 && (
            <Sidebar>
              <PostList posts={lastPosts} isLastPosts={true} />
            </Sidebar>
          )}
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
  .categories {
    padding-top: 2rem;
    position: relative;
  }
`;

export default HomePage;
