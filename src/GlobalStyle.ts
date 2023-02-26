import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --color-primary: #666;
    --color-secondary: #aaa;
    --color-white: #fff;
    --color-black: #333;
    --color-white-background: #ddd;
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
      // font-family: 'Roboto', sans-serif;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background: var(--color-white);
    line-height: 1.5;
    font-size: 1rem;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: var(--color-primary);
    background: var(--color-white-background);
    border-radius: var(--radius);
    transition: var(--transition);
    &:hover{
      color: var(--color-white-background);
      background: var(--color-dark-background);
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
  }

  .container {
    margin-top: 5rem;
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 2rem;
  }
  .page-100 {
    min-height: calc(100vh - 10rem);
  }
  .page {
    min-height: calc(100vh - (20vh + 10rem));
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
