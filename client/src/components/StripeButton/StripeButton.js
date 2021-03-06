import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51H8pNUFma6ORjTx2P38FKLCo0JZfrUJZKQcvDihmXWMsqudV7fMWbUMgYqmbU1aeB8Muwa4l8mWt0GvUSA3N0B1O004z1bPpPp';

	const onToken = token => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token
			}
		})
			.then(response => {
				alert('payment success');
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='Clothing Shop'
			billingAddress
			shippingAddress
			image='https://sendeyo.com/up/d/f3eb2117da'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export { StripeButton };
