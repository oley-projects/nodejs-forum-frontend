import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --color-primary: #666;
    --color-secondary: #aaa;
    --color-white: #fff;
    --color-black: #333;
    --color-ligth-background: #ddd;
    --color-white-background: #eee;
    --color-dark-background: #999;
    --transition: all 0.3s ease;
    --spacing: 0.1rem;
    --radius: 0.2rem;
    --max-width: 1280px;
  }
  * {
      margin: 0;
      padding: 0;
      outline:0;
      box-sizing: border-box;
  }
  body, button, input {
    font-family: 'Roboto', sans-serif;
    background: var(--color-white);
    color: var(--color-primary);
    line-height: 1.5;
    font-size: 1rem;
  }
  button {
    line-height: 0;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    border: none;
    color: var(--color-primary);
    background: var(--color-white-background);
    border-radius: var(--radius);
    transition: var(--transition);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    padding: 0.5rem;
    &:hover {
      color: var(--color-white-background);
      background: var(--color-dark-background);
    }
  }
  button {
    border: none;
    background: none;
    color: var(--color-dark-background);
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      color: var(--color-primary);
    }
  }
  input {
    padding: 0.1rem 0.3rem;
    border: none;
    border-radius: var(--radius);
    transition: var(--transition);
    box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0);
    &:focus, &:active {
      box-shadow: 0 0 0.12rem rgba(0, 0, 0, 0.5);
    }
  }
  hr {
    border: none;
    color: var(--color-primary);
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    line-height: 1.2;
    margin-bottom: 0.7rem;
  }
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.2rem;
  }
  h5 {
    font-size: 1rem;
  }
  h6 {
    font-size: 0.9rem;
  }
  p {
    margin-bottom: 1rem;
    color: var(--color-primary);
  }
  header, footer {
    padding: 0 2rem;
    background: var(--color-white-background);
  }

  .container {
    margin-top: 5rem;
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 2rem;
  }
  .centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-100 {
    min-height: calc(100vh - 10rem);
  }
  .page {
    min-height: calc(100vh - (20vh + 10rem));
  }
  .show-navbar {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  @media screen and (min-width: 960px) {
    h1 {
      font-size: 2.75rem;
    }
    h2 {
      font-size: 2.25rem;
    }
    h3 {
      font-size: 1.8rem;
    }
    h4 {
      font-size: 1.6rem;
    }
    h5 {
      font-size: 1.2rem;
    }
    h6 {
      font-size: 1rem;
    }
    body {
      font-size: 1rem;
    }
    h1,
    h2,
    h3,
    h4 {
      line-height: 1;
    }
    header, footer {
      padding: 0 5rem;
    }

    .section {
      padding: 5rem 0;
    }
    .section-center {
      width: 90vw;
      margin: 0 auto;
      max-width: var(--max-width);
    }
    .text-center {
      text-align: center;
    }
    .container {
      padding: 3rem 5rem;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
    }
  }

  @media screen and (min-width: 1024px) {
    .section-center {
      width: 95vw;
    }
  }
`;

export default GlobalStyle;
