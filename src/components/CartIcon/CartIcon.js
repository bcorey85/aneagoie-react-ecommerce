import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as ShoppingIcon } from '../../images/shopping-bag.svg';

import { toggleCartHidden } from '../../redux/cart/cartActions';
import { selectCartItemCount } from '../../redux/cart/cartSelectors';
import './CartIcon.scss';

const CartIconBase = ({ toggleCartHidden, itemCount }) => {
	return (
		<div className='cart-icon' onClick={toggleCartHidden}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{itemCount}</span>
		</div>
	);
};

const mapDipatchToProps = dispatch => {
	return {
		toggleCartHidden: () => dispatch(toggleCartHidden())
	};
};

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemCount
});

export const CartIcon = connect(mapStateToProps, mapDipatchToProps)(
	CartIconBase
);
