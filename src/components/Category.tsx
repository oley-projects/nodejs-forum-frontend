import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CategoryForumElem from './CategoryForumElem';

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
  id: number;
  name: string;
}

const Category = ({ id, name }: ICatProps) => {
  return (
    <WrapCategory>
      <header>
        <h5>
          <Link to={`/viewcategoty/${id}`} className='inline-link'>
            {name}
          </Link>
        </h5>
      </header>
      <section>
        {forums.map((forum) => (
          <CategoryForumElem key={forum.id} {...forum} />
        ))}
      </section>
    </WrapCategory>
  );
};

const WrapCategory = styled.section`
  margin-bottom: 3rem;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  header {
    padding: 0.5rem 1rem;
    background: var(--color-white-bg-transparent);
  }
`;

export default Category;
