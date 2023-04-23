import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';

interface IItemActionProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ItemAction = ({ onEdit, onDelete }: IItemActionProps) => {
  return (
    <WrapItemAction>
      <button onClick={onEdit}>
        <div>
          <CiEdit size={'1.2rem'} className='icon' />
        </div>
        <div>edit</div>
      </button>
      <button onClick={onDelete}>
        <div>
          <AiOutlineDelete size={'1.2rem'} className='icon' />
        </div>
        <div>delete</div>
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
    flex-direction: row;
    gap: 0.2rem;
    align-items: center;
    border: 0.1rem solid var(--color-secondary);
    border-radius: var(--radius);
  }
`;

export default ItemAction;