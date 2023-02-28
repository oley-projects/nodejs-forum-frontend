import styled from 'styled-components';
import { Sidebar } from '../components';

const HomePage = () => {
  return (
    <WrapHome>
      <div>HomePage</div>
      <Sidebar />
    </WrapHome>
  );
};

const WrapHome = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 2rem;
  @media (min-width: 960px) {
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
  }
`;

export default HomePage;
