import React from 'react';
import { SignIn } from '../../components/SignIn/SignIn';
import { SignUp } from '../../components/SignUp/SignUp';

import './SignInandSignUp.scss';

const SignInandSignUp = () => {
	return (
		<div className='sign-in-and-sign-up'>
			<SignIn />
			<SignUp />
		</div>
	);
};

export { SignInandSignUp };
