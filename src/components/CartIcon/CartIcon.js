import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../images/shopping-bag.svg';

import { toggleCartHidden } from '../../redux/cart/cartActions';
import './CartIcon.scss';

const CartIconBase = ({ toggleCartHidden }) => {
	return (
		<div className='cart-icon' onClick={toggleCartHidden}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>0</span>
		</div>
	);
};

const mapDipatchToProps = dispatch => {
	return {
		toggleCartHidden: () => dispatch(toggleCartHidden())
	};
};

export const CartIcon = connect(null, mapDipatchToProps)(CartIconBase);
