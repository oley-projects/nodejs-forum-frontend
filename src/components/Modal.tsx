import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  children: React.ReactNode;
}
const Modal = ({ children }: ModalProps) => {
  return (
    <ModalWrap>
      <div className='modal'>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <button>
            <AiOutlineClose size={'1.75rem'} />
          </button>
        </div>
        <div className='modal-form'>{children}</div>
      </div>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  .modal {
    border-radius: var(--radius);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    background-color: var(--color-white-transparent);
    @media (min-width: 640px) {
      width: 75%;
    }
    @media (min-width: 960px) {
      width: auto;
    }
  }
  .modal-form {
    padding: 0 1.5rem 1.5rem;
  }
`;

export default Modal;
