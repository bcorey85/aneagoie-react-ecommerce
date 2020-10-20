import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/crown.svg';
import { auth } from '../../firebase/firebase';

import './Header.scss';

const Header = ({ currentUser }) => {
	return (
		<div className='header'>
			<Link to='/'>
				<Logo className='logo' />
			</Link>
			<div className='options'>
				<Link to='/shop' className='option'>
					SHOP
				</Link>
				<Link to='/contact' className='option'>
					CONTACT
				</Link>
				{currentUser ? (
					<div className='option' onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				) : (
					<Link className='option' to='/signin'>
						SIGN IN
					</Link>
				)}
			</div>
		</div>
	);
};

export { Header };
