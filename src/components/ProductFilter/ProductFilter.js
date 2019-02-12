import React from 'react';
import Input from '../../ui/Input/Input';
import cssModule from './ProductFilter.module.css';

const ProductFilter = ({ onChange, value, clearFilter }) => {
  let searchFragment = (
    <div className={`fa fa-search ${cssModule.searchButton}`} />
  );
  let cancelFragment = (
    <div
      onClick={clearFilter}
      style={{ cursor: 'pointer' }}
      className={`fa fa-times ${cssModule.searchButton}`}
    />
  );

  return (
    <div className={cssModule.productFilterContainer}>
      <Input
        className={cssModule.productFilter}
        block={true}
        onChange={onChange}
        placeholder="Cerca..."
        value={value}
      />
      {value.length > 0 ? cancelFragment : searchFragment}
    </div>
  );
};

export default ProductFilter;
