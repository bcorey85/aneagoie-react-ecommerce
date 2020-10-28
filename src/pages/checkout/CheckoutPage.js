import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CheckoutItem } from '../../components/CheckoutItem/CheckoutItem';
import { StripeButton } from '../../components/StripeButton/StripeButton';

import {
	selectCartItems,
	selectCartTotal
} from '../../redux/cart/cartSelectors';
import './CheckoutPage.scss';

const CheckoutPageBase = ({ cartItems, total }) => {
	return (
		<div className='checkout-page'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>
				<div className='header-block'>
					<span>Description</span>
				</div>
				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Price</span>
				</div>
				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map(cartItem => {
				return <CheckoutItem cartItem={cartItem} key={cartItem.id} />;
			})}
			<div className='total'>
				<span>TOTAL: ${total}</span>
			</div>
			<div className='test-warning'>
				*Please use the following test card for payments*
				<br />
				4242 4242 4242 4242 Exp - 01/25 - CVV - 123
			</div>
			<StripeButton price={total} />
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal
});

export const CheckoutPage = connect(mapStateToProps)(CheckoutPageBase);
