import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  children: React.ReactNode;
  closeHandler: () => void;
}
const Modal = ({ children, closeHandler }: ModalProps) => {
  const clickPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <ModalWrap onClick={closeHandler}>
      <div className='modal' onClick={clickPropagation}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <button onClick={closeHandler}>
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
  z-index: 100;
  .modal {
    border-radius: var(--radius);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    background-color: var(--color-white-transparent);
    overscroll-behavior: contain;
    z-index: 110;
    @media (min-width: 640px) {
      width: 75%;
    }
    @media (min-width: 960px) {
      width: auto;
    }
  }
  .modal-form {
    padding: 0 1.5rem 1.5rem;
    button {
      margin-top: 1.2rem;
      width: 100%;
    }
  }
  .input {
    label,
    input {
      display: block;
      width: 100%;
    }
    label {
      padding-left: 0.5rem;
    }
    input {
      margin-bottom: 0.5rem;
      @media (min-width: 960px) {
        width: 20rem;
      }
    }
  }
  .show-psw {
    margin: 0.6rem 0.1rem 0.3rem;
    display: flex;
    align-items: center;
    line-height: 1;
    input {
      margin-bottom: 0.05rem;
    }
    label {
      padding-left: 0.5rem;
      font-size: 0.9em;
    }
  }
`;

export default Modal;
