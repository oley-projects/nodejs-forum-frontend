import styled from 'styled-components';

const Loader = () => {
  return <WrapLoader></WrapLoader>;
};
const WrapLoader = styled.span`
  margin: 0 auto;
  display: block;
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;

  &:before,
  &:after {
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }
  &:before {
    animation: ball1 1s infinite;
    background-color: var(--color-grey-blue);
    box-shadow: 30px 0 0 var(--color-orange);
    margin-bottom: 10px;
  }
  &:after {
    animation: ball2 1s infinite;
    background-color: var(--color-orange);
    box-shadow: 30px 0 0 var(--color-grey-blue);
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg) scale(0.8);
    }
    50% {
      transform: rotate(360deg) scale(1.2);
    }
    100% {
      transform: rotate(720deg) scale(0.8);
    }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 var(--color-orange);
    }
    50% {
      box-shadow: 0 0 0 var(--color-orange);
      margin-bottom: 0;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 var(--color-orange);
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 var(--color-grey-blue);
    }
    50% {
      box-shadow: 0 0 0 var(--color-grey-blue);
      margin-top: -20px;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 var(--color-grey-blue);
      margin-top: 0;
    }
  }
`;
export default Loader;
