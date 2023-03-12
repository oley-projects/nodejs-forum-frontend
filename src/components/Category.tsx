import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CategoryTopicElem from './CategoryTopicElem';

const forums = [
  {
    id: 1,
    name: 'First forum',
    description: 'This is just text for forum 1',
    topics: '3',
    posts: '10',
    lastTopic: 'Last topic',
    lastUser: 'User',
    lastPostDate: `${new Date().toLocaleString()}`,
  },
  {
    id: 2,
    name: 'Second forum',
    description: 'This is just text for forum 2',
    topics: '6',
    posts: '21',
    lastTopic: 'Last topic',
    lastUser: 'User',
    lastPostDate: `${new Date().toLocaleString()}`,
  },
  {
    id: 3,
    name: 'Thirt forum',
    description: 'This is just text for forum 3',
    topics: '2',
    posts: '8',
    lastTopic: 'Last topic',
    lastUser: 'User',
    lastPostDate: `${new Date().toLocaleString()}`,
  },
  {
    id: 4,
    name: 'Fourth forum',
    description: 'This is just text for forum 4',
    topics: '3',
    posts: '7',
    lastTopic: 'Last topic',
    lastUser: 'User',
    lastPostDate: `${new Date().toLocaleString()}`,
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
          <CategoryTopicElem key={forum.id} {...forum} />
        ))}
      </section>
    </WrapCategory>
  );
};

const WrapCategory = styled.section`
  margin-bottom: 3rem;
  border-radius: var(--radius);
  box-shadow: 0 0 0.16rem 0.08rem rgba(0, 0, 0, 0.2);
  overflow: hidden;
  header {
    padding: 0.5rem 1rem;
    background: var(--color-white-bg-transparent);
  }
  .category-content {
    padding: 0.5rem 0;
    background: var(--color-white-background);
  }
`;

export default Category;
