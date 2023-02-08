// import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    if (!query.value) {
      toast.warn('Please enter the search term!');
    }

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
