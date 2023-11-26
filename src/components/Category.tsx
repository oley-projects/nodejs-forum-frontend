import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CategoryForumElem from './CategoryForumElem';
import ItemAction from './ItemAction';

interface ICatProps {
  id: number;
  name: string;
  description: string;
  forums: [
    {
      id: number;
      name: string;
      topics: [];
    }
  ];
}

const Category = ({ id, name, forums }: ICatProps) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button>Create New Forum</button>
      </div>
      <WrapCategory>
        <header>
          <h5>
            <Link to={`/viewcategoty/${id}`} className='inline-link'>
              {name}
            </Link>
          </h5>
          <ItemAction onEdit={() => {}} onDelete={() => {}} creatorId='' />
        </header>
        <section>
          {forums.map((forum) => (
            <CategoryForumElem key={forum.id} {...forum} />
          ))}
        </section>
      </WrapCategory>
    </>
  );
};

const WrapCategory = styled.section`
  margin: 1rem 0 3rem;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background: var(--color-white-bg-transparent);
  }
`;

export default Category;
