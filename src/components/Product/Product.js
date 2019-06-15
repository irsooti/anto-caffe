import React from 'react';
import CssModule from './Product.module.css';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import { TimelineMax, Bounce } from 'gsap/all';

const ExistingProduct = ({
  descr,
  id,
  quantity = 0,
  onAdd = () => {},
  onRemove = () => {}
}) => {
  // const onMouseEnterButton = ({ target }) => {
  //   console.log(target);
  //   TweenMax.to(target, 0.5, {
  //     borderRadius: '50%',
  //     ease: Circ.easeIn
  //   });
  // };

  // const onMouseLeaveButton = ({ target }) => {
  //   console.log(target);
  //   TweenMax.to(target, 0.5, {
  //     borderRadius: '7px',
  //     ease: Circ.easeIn
  //   });
  // };
  const tl = new TimelineMax();

  const useTl = fn => ({ target }) => {
    tl.to(target, 0.2, {
      transform: 'scale(1.2)'
    }).to(target, 0.55, {
      ease: Bounce.easeOut,
      transform: 'scale(1)'
    });

    return fn();
  };

  return (
    <>
      {quantity > 0 ? (
        <div className={CssModule.quantity}>x{quantity}</div>
      ) : null}
      <div className={CssModule.description}>{descr}</div>
      <div className={CssModule.productController}>
        <Button
          ariaLabel={`Aggiungi un'ordinazione di ${descr} al carrello`}
          onClick={useTl(onAdd(id))}
          text="+"
        />
        <Button
          ariaLabel={`Rimuovi un'ordinazione di ${descr} dal carrello`}
          disabled={quantity === 0}
          onClick={useTl(onRemove(id))}
          text="-"
        />
      </div>
    </>
  );
};

class AddNewProduct extends React.Component {
  state = {
    value: ''
  };

  onClick = () => {
    let { value } = this.state;
    if (value.length > 3) this.props.onAdd(this.state.value);
  };

  onChangeHandler = (value = '') => {
    this.setState({ value: value });
  };

  render() {
    return (
      <div className={CssModule.addProductContainer}>
        <div style={{ width: '100%' }} className={CssModule.description}>
          <Input
            block={true}
            onChange={this.onChangeHandler}
            style={{ paddingBottom: '15px', width: '100%' }}
            placeholder="Aggiungi un prodotto se non è presente"
          />
        </div>
        <div
          style={{ width: '100%', justifyContent: 'flex-end' }}
          className={CssModule.addProduct}
        >
          <Button
            onMouseOver={this.onMouseEnterButton}
            onClick={this.onClick}
            text="Aggiungi"
          />
        </div>
      </div>
    );
  }
}

const Product = ({
  descr,
  id,
  isAddingProduct = false,
  quantity = 0,
  onAdd = () => {},
  onRemove = () => {}
}) => {
  return (
    <div className={CssModule.product}>
      {isAddingProduct ? (
        <AddNewProduct onAdd={onAdd} />
      ) : (
        <ExistingProduct
          descr={descr}
          id={id}
          quantity={quantity}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
    </div>
  );
};

export default Product;
