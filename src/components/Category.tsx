import { Link } from 'react-router-dom';
import styled from 'styled-components';

const forums = [
  {
    id: 1,
    name: 'First forum',
    description: 'This is just text for forum 1',
    topics: '3',
    posts: '10',
  },
  {
    id: 2,
    name: 'Second forum',
    description: 'This is just text for forum 2',
    topics: '6',
    posts: '21',
  },
  {
    id: 3,
    name: 'Thirt forum',
    description: 'This is just text for forum 3',
    topics: '2',
    posts: '8',
  },
  {
    id: 4,
    name: 'Fourth forum',
    description: 'This is just text for forum 4',
    topics: '3',
    posts: '7',
  },
];

interface ICatProps {
  name: string;
}

const Category = ({ name }: ICatProps) => {
  return (
    <WrapCategory>
      <header>
        <h5>
          <Link to='#' className='inline-link'>
            {name}
          </Link>
        </h5>
      </header>
      <section className='category-content'>
        {forums.map((forum) => (
          <div key='forum.id'>{forum.name}</div>
        ))}
      </section>
    </WrapCategory>
  );
};

const WrapCategory = styled.section`
  header {
    padding: 0.5rem 1rem;
    background: var(--color-white-bg-transparent);
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
  }
  .category-content {
    background: var(--color-white-background);
  }
`;

export default Category;
