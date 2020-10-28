import React from 'react';
import { Button } from '../Button/Button';
import { FormInput } from '../FormInput/FormInput';
import { auth, signInWithGoogle } from '../../firebase/firebase';

import './SignIn.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async e => {
		e.preventDefault();

		const { email, password } = this.state;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: '', password: '' });
		} catch (error) {
			console.log('error with signin', error.message);
		}
	};

	handleChange = e => {
		const { value, name } = e.target;

		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						type='email'
						handleChange={this.handleChange}
						value={this.state.email}
						label='Email'
						required
					/>

					<FormInput
						name='password'
						type='password'
						handleChange={this.handleChange}
						value={this.state.password}
						label='Password'
						required
					/>
					<div className='buttons'>
						<Button type='submit'>Sign In</Button>
						<Button
							type='button'
							onClick={signInWithGoogle}
							isGoogleSignIn>
							Sign In With Google
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

export { SignIn };
