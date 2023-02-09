// import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchform.styled';

export const Searchform = ({ onSearch }) => {
  const handleSubmit = event => {
    event.preventDefault();

    const { query } = event.target.elements;
    onSearch(query.value);

    event.target.reset();
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchFormButton>
        <ImSearch size={20} />
      </SearchFormButton>
      <SearchFormInput name="query" />
    </SearchForm>
  );
};

Searchform.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
