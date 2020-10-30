import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CollectionPreview } from '../../components/CollectionPreview/CollectionPreview';

import { selectCollectionsForPreview } from '../../redux/shop/shopSelectors';
import './CollectionsOverview.scss';

const CollectionsOverviewBase = ({ collections }) => {
	return (
		<div className='collections-overview'>
			{collections.map(({ id, ...props }) => {
				return <CollectionPreview key={id} {...props} />;
			})}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForPreview
});

export const CollectionsOverview = connect(mapStateToProps)(
	CollectionsOverviewBase
);
