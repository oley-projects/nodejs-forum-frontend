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
    --color-orange: #FFAA33;
    --color-grey-blue: #c4c1e0;
    --color-green: rgba(25,135,84, 0.85);
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
  body, button, input, textarea {
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
  input, textarea {
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
  textarea {
    width: 100%;
    border: 0.05rem solid rgba(0, 0, 0, 0.15);
    resize: none;
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
  select {
    margin: 0.5rem 1rem 0.5rem 0;
    padding: 0.5rem;
    transition: all 0.3s ease;
    border: 1px solid var(--color-white-bg-transparent);
    cursor: pointer;
    &:hover, &:focus {
      background: var(--color-white-bg-transparent);
    }

    option {
      padding: 0.5rem 0;
      background: var(--color-white);
      border-top: 0.5rem solid transparent !important;
      &:hover {
        background: var(--color-white-bg-transparent) !important;
        box-shadow: 0 0 10px 10px var(--color-white-bg-transparent) inset;
      }
    }
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
  .empty {
    padding: 3rem 0;
    text-align: center;
    color: var(--color-ligth-background);
    font-size: 2em;
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
    display: grid;
    gap: 0.5rem;
    background: var(--color-white);
    transition: background 0.3s ease;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-white-bg-transparent);
    }
  }
  .description {
    font-size: 0.8em;
    color: var(--color-secondary);
  }
  .total-stats {
    font-size: 0.9em;
    color: var(--color-dark-background);
  }
  .add-element {
    padding: 0 0.5rem 0.5rem;
    display: flex;
    justify-content: end;
    position: absolute;
    right: 0;
    bottom: 0;
    transition: opacity 0.3s ease;
    button {
      padding: 0.2rem 0.4rem;
      background-color: var(--color-white);
      color: var(--color-green);
      border: 0.05rem solid var(--color-green);
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      line-height: 1rem;
      &:hover {
        background-color: var(--color-green);
        color: var(--color-white-background);
      }
    }
  }
  .pos-left-top {
    left: 0;
    top: 0;
    right: auto;
    bottom: auto;
  }
  .last-grid-column {
    display: flex;
    flex-direction: column;
    font-size: 0.9em;

  }
  .folder-icon {
    display: flex;
    height: 100%;
    align-items: center;
    transition: background 0.3s ease;
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
    .last-grid-column {
      align-items: end;
    }
    .op-1 {
      opacity: 1;
    }
    .op-0 {
      opacity: 0;
    }
    .op-trans {
      transition: opacity 0.3s ease;
    }
  }

  @media screen and (min-width: 1024px) {
    .section-center {
      width: 95vw;
    }
  }
`;

export default GlobalStyle;
