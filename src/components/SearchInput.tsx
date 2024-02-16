import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePostContext } from '../context/postContext';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

const SearchInput = () => {
  const { getFoundPosts } = usePostContext();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const OnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getFoundPosts(inputValue, 1, 10);
      setInputValue('');
      navigate(`viewresults/${inputValue ? `q=${inputValue}` : ''}`);
      e.currentTarget.blur();
    }
  };
  const searchHandler = () => {
    getFoundPosts(inputValue, 1, 10);
    setInputValue('');
  };
  const clearHandler = () => {
    setInputValue('');
  };
  return (
    <SearchContainer>
      <input
        type='text'
        value={inputValue}
        onChange={onChangeHandler}
        onKeyUp={OnKeyPressHandler}
      />
      {inputValue && <IoClose onClick={clearHandler} className='clear-input' />}

      <Link
        to={`viewresults/${inputValue ? `q=${inputValue}` : ''}`}
        onClick={searchHandler}
        className='search-btn'
      >
        <IoMdSearch size={'1.5rem'} style={{ verticalAlign: 'middle' }} />
      </Link>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: inline;
  input {
    padding-right: 1rem;
    box-shadow: 0 0 0.15rem #eee;
  }
  .search-btn {
    margin-left: 0.4rem;
    padding: 0.7rem 0.5rem 0.8rem;
  }
  .clear-input {
    margin-left: -1rem;
    display: inline;
    vertical-align: middle;
    cursor: pointer;
    color: #bbb;
    transition: color 0.3s ease;
    &:hover {
      color: #666;
    }
  }
`;

export default SearchInput;
