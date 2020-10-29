import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { CollectionsOverviewContainer } from '../../components/CollectionsOverview/CollectionsOverviewContainer';
import { CollectionPageContainer } from '../collectionpage/CollectionPageContainer';

import { fetchCollectionsStart } from '../../redux/shop/shopActions';
import './ShopPage.scss';

class ShopPageBase extends React.Component {
	componentDidMount() {
		const { fetchCollectionsStart } = this.props;
		fetchCollectionsStart();
	}

	render() {
		const { match } = this.props;

		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionsOverviewContainer}
				/>
				<Route
					exact
					path={`${match.path}/:collectionId`}
					component={CollectionPageContainer}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
	};
};

export const ShopPage = connect(null, mapDispatchToProps)(ShopPageBase);
