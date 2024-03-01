import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchContext } from '../context/searchContext';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useGeneralContext } from '../context/generalContext';

interface ISearchInputProps {
  searchType: string;
}

const SearchInput = ({ searchType }: ISearchInputProps) => {
  const { forumType } = useGeneralContext();
  const { getFoundResults, sortResults } = useSearchContext();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const OnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getFoundResults(inputValue, searchType, sortResults, 1, 10);
      setInputValue('');
      navigate(`/viewresults/${inputValue ? `q=${inputValue}` : ''}`);
      e.currentTarget.blur();
    }
  };
  const searchHandler = () => {
    getFoundResults(inputValue, searchType, sortResults, 1, 10);
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
        to={`/viewresults/${inputValue ? `q=${inputValue}` : ''}`}
        onClick={searchHandler}
        className='search-btn'
      >
        {forumType === 'results' && <span>Search</span>}
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
  a > span {
    padding: 0 0.4rem;
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
