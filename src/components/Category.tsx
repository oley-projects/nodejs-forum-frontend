import styled from 'styled-components';
import CategoryForumElem from './CategoryForumElem';
import ItemAction from './ItemAction';
import { useCategoryContext } from '../context/categoryContext';
import { useFormItemContext } from '../context/formItemContext';
import { useUserContext } from '../context/userContext';
import { TfiPencilAlt } from 'react-icons/tfi';
import { useState } from 'react';

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
        creator: { _id: string; id: string; name: string };
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
  const [isHovered, setIsHovered] = useState(false);
  const mouseOverHandler = () => {
    if (isAuth) setIsHovered(true);
  };
  const mouseLeaveHandler = () => {
    if (isAuth) setIsHovered(false);
  };
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
    <ContainCategory
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <WrapCategory>
        <header>
          <h5>{name}</h5>
          <div>
            <ItemAction
              onEdit={editHandler}
              onDelete={() => deleteCategory(id)}
              creatorId={creator?._id}
              type={'category'}
            />
          </div>
        </header>
        <section>
          {forums?.length > 0 ? (
            forums.map((forum) => (
              <CategoryForumElem key={forum.id} {...forum} />
            ))
          ) : (
            <div className='empty'>Empty forum</div>
          )}
        </section>
      </WrapCategory>
      {isAuth && (
        <div className={`add-element  ${isHovered ? 'op-1' : 'op-0'}`}>
          <button onClick={newForumHandler}>
            <TfiPencilAlt />
            &nbsp;New forum
          </button>
        </div>
      )}
    </ContainCategory>
  );
};

const ContainCategory = styled.section`
  margin-bottom: 1.5rem;
  padding-bottom: 2.5rem;
  position: relative;
  z-index: 1;
  header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background: var(--color-white-bg-transparent);
    div {
      transition: opacity 0.3s ease;
    }
  }
`;
const WrapCategory = styled.div`
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

export default Category;
