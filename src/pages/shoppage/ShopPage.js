import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { CollectionsOverview } from '../../components/CollectionsOverview/CollectionsOverview';
import { CollectionPage } from '../collectionpage/CollectionPage';

import {
	firestore,
	convertCollectionsSnapshotToMap
} from '../../firebase/firebase';
import { updateCollections } from '../../redux/shop/shopActions';
import './ShopPage.scss';

class ShopPageBase extends React.Component {
	unsubscribeFromSnapshot = null;
	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');
		this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
			async snapshot => {
				const collectionsMap = convertCollectionsSnapshotToMap(
					snapshot
				);
				updateCollections(collectionsMap);
			}
		);
	}

	componentWillUnmount() {}

	render() {
		const { match } = this.props;
		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionsOverview}
				/>
				<Route
					exact
					path={`${match.path}/:collectionId`}
					component={CollectionPage}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateCollections: collectionsMap =>
			dispatch(updateCollections(collectionsMap))
	};
};

export const ShopPage = connect(null, mapDispatchToProps)(ShopPageBase);
