import React from 'react';
import './Button.scss';

export const Button = ({ children, isGoogleSignIn, inverted, ...props }) => {
	return (
		<button
			className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn
				? 'google-sign-in'
				: ''} custom-button`}
			{...props}>
			{children}
		</button>
	);
};
