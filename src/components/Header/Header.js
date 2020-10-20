import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/crown.svg';

import './Header.scss';

const Header = () => {
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
			</div>
		</div>
	);
};

export { Header };
