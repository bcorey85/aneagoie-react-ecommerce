import React from 'react';
import './Button.scss';

export const Button = ({ children, isGoogleSignIn, ...props }) => {
	return (
		<button
			className={`${isGoogleSignIn
				? 'google-sign-in'
				: ''} custom-button`}
			{...props}>
			{children}
		</button>
	);
};
