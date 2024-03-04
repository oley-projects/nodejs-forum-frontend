import styled from 'styled-components';

interface IUserItemType {
  name: string;
  createdAt: string;
}

const UserItem = ({ name, createdAt }: IUserItemType) => {
  return (
    <WrapUser>
      About User name: {name}, registered: {createdAt}
    </WrapUser>
  );
};

const WrapUser = styled.footer`
  display: block;
`;

export default UserItem;
