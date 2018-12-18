import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CartList from './CartList';

configure({ adapter: new Adapter() });

const fakeCart = [
  { descr: 'moke', quantity: 3 },
  { descr: 'moke', quantity: 3 }
];

describe('<CartList />', () => {
  it('should render an order list', () => {
    let wrapper = shallow(<CartList cart={fakeCart} />);
    // console.log(wrapper.debug());
    expect(wrapper.find('.cart__items')).toHaveLength(2);
  });
});
