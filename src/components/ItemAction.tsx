import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { useUserContext } from '../context/userContext';

interface IItemActionProps {
  onEdit: () => void;
  onDelete: () => void;
  creatorId: string;
  type: string;
}
const ItemAction = ({
  onEdit,
  onDelete,
  creatorId,
  type,
}: IItemActionProps) => {
  const {
    isAuth,
    user: { userId },
  } = useUserContext();
  if (!isAuth || userId !== creatorId) {
    return null;
  }
  return (
    <WrapItemAction>
      <button onClick={onEdit}>
        <div>
          <CiEdit size={'1.2rem'} className='icon' />
        </div>
        <div>edit {type}</div>
      </button>
      <button onClick={onDelete}>
        <div>
          <AiOutlineDelete size={'1.2rem'} className='icon' />
        </div>
        <div>delete {type}</div>
      </button>
    </WrapItemAction>
  );
};

const WrapItemAction = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  button {
    padding: 0.15rem 0.3rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.2rem;
    align-items: center;
    font-size: 0.9em;
    line-height: 0.9em;
    border: 0.1rem solid var(--color-secondary);
    border-radius: var(--radius);
  }
`;

export default ItemAction;
