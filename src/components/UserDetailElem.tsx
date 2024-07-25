import { useState } from 'react';
import defaultAvatar from '../assets/images/defaultAvatar';
import { useGeneralContext } from '../context/generalContext';
import { IUser, useUserContext } from '../context/userContext';
import Loader from './Loader';
import UserDetailFormItem from './UserDetailFormItem';

interface IUserElemProps {
  user: IUser;
  isEditing: boolean;
}

//type User = { [key: string]: string };
const UserDetailElem = ({ user, isEditing }: IUserElemProps) => {
  const { updateUser } = useUserContext();
  const { isLoading } = useGeneralContext();
  const [editMode, setEditMode] = useState<string | null>(null);
  const handleUpdate = (field: string, value: string) => {
    /*const user = {} as User;
    user[field] = value;*/
    updateUser({ [field]: value });
    setEditMode(null);
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  return user && !isLoading ? (
    <div className='display-flex'>
      <div>
        <img src={user?.image || defaultAvatar} alt='avatar' />
      </div>
      <div>
        {isEditing ? (
          <UserDetailFormItem
            field='name'
            value={user?.name}
            handleUpdate={handleUpdate}
            handleCancel={handleCancel}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : (
          <div>Name: {user?.name}</div>
        )}
        <div>Email: {user?.email}</div>
        {isEditing ? (
          <UserDetailFormItem
            field='rank'
            value={user?.rank}
            handleUpdate={handleUpdate}
            handleCancel={handleCancel}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : (
          <div>Rank: {user?.rank}</div>
        )}
        <div>Role: {user?.role}</div>
        <div>Age: {user?.birthday}</div>
        {isEditing ? (
          <UserDetailFormItem
            field='location'
            value={user?.location}
            handleUpdate={handleUpdate}
            handleCancel={handleCancel}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : (
          <div>Location: {user?.location}</div>
        )}
        <div>
          Registered:
          {' ' + user?.createdAt}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default UserDetailElem;
