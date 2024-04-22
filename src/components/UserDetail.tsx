import React, { useState } from 'react';
import styled from 'styled-components';
import defaultAvatar from '../assets/images/defaultAvatar';
import { useUserContext } from '../context/userContext';
import UserDetailFormItem from './UserDetailFormItem';

const UserDetail: React.FC = () => {
  const { user, isAuth, updateUser } = useUserContext();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (field: string, value: string) => {
    updateUser({ [field]: value });
    setEditMode(null);
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  const handleIsEditUser = () => {
    setIsEditing(!isEditing);
  };

  return (
    <WrapUser>
      <>
        {isAuth ? (
          <>
            <div className='display-flex'>
              <div>
                <img src={user.image || defaultAvatar} alt='avatar' />
              </div>
              <div>
                {isEditing ? (
                  <UserDetailFormItem
                    field='name'
                    value={user.name}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    setEditMode={setEditMode}
                  />
                ) : (
                  <div>Name: {user.name}</div>
                )}
                <div>Email: {user.email}</div>
                {isEditing ? (
                  <UserDetailFormItem
                    field='rank'
                    value={user.rank}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    setEditMode={setEditMode}
                  />
                ) : (
                  <div>Rank: {user.rank}</div>
                )}
                <div>Role: {user.role}</div>
                <div>Age: {user.birthday}</div>
                {isEditing ? (
                  <UserDetailFormItem
                    field='location'
                    value={user.location}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    setEditMode={setEditMode}
                  />
                ) : (
                  <div>Location: {user.location}</div>
                )}
                <div>
                  Registered:
                  {' ' + new Date(user.createdAt).toISOString().split('T')[0]}
                </div>
              </div>
            </div>
            <div>
              <button onClick={handleIsEditUser}>
                <span>{isEditing ? 'View' : 'Edit'} Mode</span>
              </button>
            </div>
          </>
        ) : (
          <div>Not authorized. Please login or sign up to continue.</div>
        )}
      </>
    </WrapUser>
  );
};

const WrapUser = styled.footer`
  button {
    padding: 0.15rem 0.3rem;
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    align-items: center;
    border: 0.1rem solid var(--color-secondary);
    border-radius: var(--radius);
    span {
      line-height: 1.2rem;
    }
  }
  input {
    padding: 0;
    max-width: 8rem;
    background-color: rgba(0, 0, 0, 0.05);
    &:active,
    &:focus {
      box-shadow: none;
      border: none;
    }
  }
  select {
    padding: 0;
    margin: 0;
    border: none;
    background-color: rgba(0, 0, 0, 0.05);
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
  .display-flex {
    display: flex;
    align-items: center;
  }
`;

export default UserDetail;
