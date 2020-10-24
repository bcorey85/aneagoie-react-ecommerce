import React from 'react';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cartSelectors';

import { Button } from '../Button/Button';
import { CartItem } from '../CartItem/CartItem';

import './CartDropdown.scss';

const CartDropdownBase = ({ cartItems }) => {
	return (
		<div className='cart-dropdown'>
			<div className='cart-items'>
				{cartItems.map(cartItem => {
					return <CartItem key={cartItem.id} item={cartItem} />;
				})}
			</div>

			<Button>GO TO CHECKOUT</Button>
		</div>
	);
};

const mapStateToProps = state => {
	return { cartItems: selectCartItems(state) };
};

export const CartDropdown = connect(mapStateToProps)(CartDropdownBase);
