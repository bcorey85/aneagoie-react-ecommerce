import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/crown.svg';
import { CartIcon } from '../CartIcon/CartIcon';
import { CartDropdown } from '../CartDropdown/CartDropdown';

import { selectCurrentUser } from '../../redux/user/userSelectors';
import { selectCartHidden } from '../../redux/cart/cartSelectors';
import { signOutStart } from '../../redux/user/userActions';
import './Header.scss';

const HeaderBase = ({ currentUser, hidden, signOutStart }) => {
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
					<div className='option' onClick={signOutStart}>
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
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => {
	return {
		signOutStart: () => dispatch(signOutStart())
	};
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderBase);
