import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../Button/Button';

import { addItem } from '../../redux/cart/cartActions';
import './CollectionItem.scss';

const CollectionItemBase = ({ item, addItem }) => {
	const { imageUrl, name, price } = item;

	return (
		<div className='collection-item'>
			<div
				className='image'
				style={{ backgroundImage: `url(${imageUrl})` }}
			/>
			<div className='collection-footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
			<Button inverted onClick={() => addItem(item)}>
				ADD TO CART
			</Button>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		addItem: item => dispatch(addItem(item))
	};
};

export const CollectionItem = connect(null, mapDispatchToProps)(
	CollectionItemBase
);
