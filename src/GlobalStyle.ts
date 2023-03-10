import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --color-primary: #666;
    --color-secondary: #aaa;
    --color-white: #fff;
    --color-black: #333;
    --color-ligth-background: #ddd;
    --color-white-background: #eee;
    --color-white-background-dark: #e4e4e4;
    --color-dark-background: #999;
    --color-white-transparent: rgba(240, 240, 240, 0.93);
    --color-white-bg-transparent: rgba(220, 220, 220, 0.83);
    --transition: all 0.3s ease;
    --spacing: 0.1rem;
    --radius: 0.2rem;
    --max-width: 1280px;
    --box-shadow: 0 0 0.16rem 0.08rem rgba(0, 0, 0, 0.2);
    --box-shadow-top: 0 -0.2rem 0.1rem -0.1rem rgba(0, 0, 0, 0.2);
    --box-shadow-bottom: 0 0.2rem 0.1rem -0.1rem rgba(0, 0, 0, 0.2);
  }
  * {
      margin: 0;
      padding: 0;
      outline:0;
      box-sizing: border-box;
  }
  body {
    overflow-y: scroll
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
  ul, li {
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
    padding: 0.1rem 0.5rem;
    border: none;
    border-radius: var(--radius);
    transition: box-shadow 0.3s ease;
    box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0);
    &:focus, &:active {
      box-shadow: 0 0 0.12rem rgba(0, 0, 0, 0.5);
    }
    &::placeholder {
      font-size: 0.9em;
      opacity: 0.8;
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
  label {
    user-select: none;
  }
  .header, .footer {
    padding: 0 2rem;
    background: var(--color-white-background);
  }

  .container {
    margin-top: 5rem;
    padding: 3rem 2rem;
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
  a.inline-link {
    padding: 0;
    letter-spacing: 0;
    color: var(--color-dark-background);
    background: transparent;
    &:hover {
      color: var(--color-black);
    }
  }
  .grid-table-item {
    padding: 0 2rem;
    display: grid;
    gap: 0.5rem;
    background: var(--color-white-background);
    transition: background 0.3s ease;
    &:first-child {
      padding-top: 1.5rem;
    }
    &:not(:last-child) {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-white-bg-transparent);
    }
    &:not(:first-child) {
      padding-top: 1rem;
    }
    &:last-child {
      padding-bottom: 1.5rem;
    }
    &:nth-child(even) {
      background: var(--color-white-background-dark);
    }
    &:hover,
    &:active {
      background: var(--color-white);
    }
    @media (min-width: 960px) {
      padding: 0 3rem;
    }
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
    .header, .footer {
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
    }
  }

  @media screen and (min-width: 1024px) {
    .section-center {
      width: 95vw;
    }
  }
`;

export default GlobalStyle;
