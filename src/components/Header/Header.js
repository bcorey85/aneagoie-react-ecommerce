import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase';

import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/crown.svg';
import { CartIcon } from '../CartIcon/CartIcon';
import { CartDropdown } from '../CartDropdown/CartDropdown';

import './Header.scss';

const HeaderBase = ({ currentUser, hidden }) => {
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
				<CartIcon />
				{hidden ? null : <CartDropdown />}
			</div>
		</div>
	);
};
const mapStateToProps = state => {
	return {
		currentUser: state.user.currentUser,
		hidden: state.cart.hidden
	};
};

export const Header = connect(mapStateToProps)(HeaderBase);
