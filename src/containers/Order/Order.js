import React, { Component } from 'react';
import Product from '../../components/Product/Product';
import cssModule from './Order.module.css';
export default class Order extends Component {
  render() {
    return (
      <div className={"container column " + cssModule.order}>
        <Product name="caffè" />
      </div>
    );
  }
}
