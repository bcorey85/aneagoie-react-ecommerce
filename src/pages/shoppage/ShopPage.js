import React from 'react';
import { SHOP_DATA } from './shop-data';
import { CollectionPreview } from '../../components/CollectionPreview/CollectionPreview';

import './ShopPage.scss';

class ShopPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collections: SHOP_DATA
		};
	}

	render() {
		const { collections } = this.state;
		return (
			<div className='shop-page'>
				{collections.map(({ id, ...props }) => {
					return <CollectionPreview key={id} {...props} />;
				})}
			</div>
		);
	}
}

export { ShopPage };
