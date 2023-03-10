import styled from 'styled-components';

interface ICatProps {
  name: string;
}

const Category = ({ name }: ICatProps) => {
  return (
    <WrapCategory>
      <h5>{name}</h5>
    </WrapCategory>
  );
};

const WrapCategory = styled.div`
  margin: 0;
`;

export default Category;
