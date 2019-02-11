import React from 'react';
import Input from '../../ui/Input/Input';
import cssModule from './ProductFilter.module.css';

const ProductFilter = ({ onChange }) => {
  return (
    <div className={cssModule.productFilterContainer}>
      <Input
        className={cssModule.productFilter}
        block={true}
        onChange={onChange}
        placeholder="Cerca..."
      />
      <div className={"fa fa-search " + cssModule.searchButton} />
    </div>
  );
};

export default ProductFilter;
