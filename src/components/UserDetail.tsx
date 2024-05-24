import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../context/userContext';
import UserDetailElem from './UserDetailElem';

const UserDetail: React.FC = () => {
  const { user, viewedUser, isAuth, getUser } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const { pathname } = useLocation();
  const pathId = pathname.split('/')[2];
  const handleIsEditUser = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    if (user.id !== pathId) {
      getUser(parseInt(pathId));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <WrapUser>
      <>
        {isAuth ? (
          <>
            {user.id === pathId ? (
              <UserDetailElem user={user} isEditing={isEditing} />
            ) : (
              <UserDetailElem user={viewedUser} isEditing={isEditing} />
            )}
            {pathId === user.id && (
              <div>
                <button onClick={handleIsEditUser}>
                  <span>{isEditing ? 'View' : 'Edit'} Mode</span>
                </button>
              </div>
            )}
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
