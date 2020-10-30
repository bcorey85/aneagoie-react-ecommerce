import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { Button } from '../Button/Button';
import { CartItem } from '../CartItem/CartItem';

import { toggleCartHidden } from '../../redux/cart/cartActions';
import { selectCartItems } from '../../redux/cart/cartSelectors';
import './CartDropdown.scss';

const CartDropdownBase = ({ cartItems, history, dispatch }) => {
	return (
		<div className='cart-dropdown'>
			<div className='cart-items'>
				{cartItems.length === 0 ? (
					<span className='empty-message'>Your cart is empty</span>
				) : (
					cartItems.map(cartItem => {
						return <CartItem key={cartItem.id} item={cartItem} />;
					})
				)}
			</div>

			<Button
				onClick={() => {
					history.push('/checkout');
					dispatch(toggleCartHidden());
				}}>
				GO TO CHECKOUT
			</Button>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	hidden: toggleCartHidden
});

export const CartDropdown = withRouter(
	connect(mapStateToProps)(CartDropdownBase)
);
