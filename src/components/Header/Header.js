import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/crown.svg';
import { auth } from '../../firebase/firebase';

import './Header.scss';

const HeaderBase = ({ currentUser }) => {
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
const mapStateToProps = state => {
	return {
		currentUser: state.user.currentUser
	};
};

export const Header = connect(mapStateToProps)(HeaderBase);
