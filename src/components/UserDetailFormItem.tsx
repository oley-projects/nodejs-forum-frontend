import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { RiFileUploadLine } from 'react-icons/ri';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import styled from 'styled-components';
import { stringCapitalize } from '../utils/utils';

interface UserDetailFormItemProps {
  field: string;
  value: string;
  handleUpdate: (field: string, value: string) => void;
  handleCancel: () => void;
  editMode: string | null;
  setEditMode: (field: string | null) => void;
}
const UserDetailFormItem: React.FC<UserDetailFormItemProps> = ({
  field,
  value,
  handleUpdate,
  handleCancel,
  editMode,
  setEditMode,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleEdit = () => {
    setEditMode(field);
    setInputValue(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    handleUpdate(field, inputValue);
    setEditMode(null);
  };

  const handleCancelClick = () => {
    handleCancel();
    setInputValue(value);
  };

  const isActive = editMode === field;

  return (
    <WrapUserFormItem>
      <div>
        <span>{stringCapitalize(field)}: </span>
        {isActive ? (
          <input value={inputValue} onChange={handleChange} />
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div>
        {isActive ? (
          <div className='action-btns'>
            <button onClick={handleSave}>
              <div>
                <RiFileUploadLine size={'1.2rem'} className='icon' />
              </div>
              <div>update {field}</div>
            </button>
            <button onClick={handleCancelClick}>
              <div>
                <MdOutlineCancelPresentation size={'1.2rem'} className='icon' />
              </div>
              <div>cancel</div>
            </button>
          </div>
        ) : (
          <button onClick={handleEdit}>
            <div>
              <CiEdit size={'1.2rem'} className='icon' />
            </div>
            <div>edit {field}</div>
          </button>
        )}
      </div>
    </WrapUserFormItem>
  );
};

const WrapUserFormItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  .action-btns {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
`;

export default UserDetailFormItem;
