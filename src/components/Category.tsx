import styled from 'styled-components';
import CategoryForumElem from './CategoryForumElem';
import ItemAction from './ItemAction';
import { useCategoryContext } from '../context/categoryContext';
import { useFormItemContext } from '../context/formItemContext';
import { useUserContext } from '../context/userContext';

interface ICatProps {
  id: number;
  name: string;
  description: string;
  creator: { _id: string };
  forums: [
    {
      id: number;
      name: string;
      description: string;
      creator: { _id: string; name: string };
      topics: [];
      totalTopics: number;
      totalPosts: number;
      lastPost?: {
        creator: { _id: string; name: string };
        createdAt: number;
        topic: { id: string; name: string };
      };
    }
  ];
}

const Category = ({ id, name, description, creator, forums }: ICatProps) => {
  const { openModalForum, setFormItem } = useFormItemContext();
  const { deleteCategory } = useCategoryContext();
  const { isAuth } = useUserContext();
  const editHandler = () => {
    setFormItem({
      id,
      name,
      description,
      action: 'edit',
      type: 'category',
    });
    openModalForum();
  };
  const newForumHandler = () => {
    setFormItem({
      id,
      name: '',
      description: '',
      action: 'new',
      type: 'forum',
    });
    openModalForum();
  };
  return (
    <WrapCategory>
      <header>
        <h5>{name}</h5>
        <ItemAction
          onEdit={editHandler}
          onDelete={() => deleteCategory(id)}
          creatorId={creator?._id}
          type={'category'}
        />
      </header>
      <section>
        {forums?.length > 0 ? (
          forums.map((forum) => <CategoryForumElem key={forum.id} {...forum} />)
        ) : (
          <div className='empty'>Empty forum</div>
        )}
      </section>
      {isAuth && (
        <div className='add-element'>
          <button onClick={newForumHandler}>Create new forum</button>
        </div>
      )}
    </WrapCategory>
  );
};

const WrapCategory = styled.section`
  margin-bottom: 4rem;
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
  .add-element {
    padding: 0 0.5rem;
    text-align: right;
    background: var(--color-white-bg-transparent);
  }
`;

export default Category;
