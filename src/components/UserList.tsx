import UserItem from './UserItem';

interface IUserListProps {
  users: [
    {
      _id: string;
      name: string;
      createdAt: string;
    }
  ];
}

const UserList = ({ users }: IUserListProps) => {
  return (
    <>
      {users?.length > 0 ? (
        users?.map((u, i) => (i < 10 ? <UserItem key={u._id} {...u} /> : null))
      ) : (
        <></>
      )}
    </>
  );
};

export default UserList;
