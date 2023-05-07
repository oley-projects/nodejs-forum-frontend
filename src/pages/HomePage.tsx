import styled from 'styled-components';
import { Sidebar, Category, PostList } from '../components';
import { useForumContext } from '../context/forumContext';

const HomePage = () => {
  const { categories } = useForumContext();
  return (
    <WrapHome>
      <div>
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <button>Create Category</button>
        </div>
      </div>
      <Sidebar>
        <PostList />
      </Sidebar>
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
