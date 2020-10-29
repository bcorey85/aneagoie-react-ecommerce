import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { withSpinner } from '../withSpinner/withSpinner';
import { CollectionsOverview } from './CollectionsOverview';

import { selectIsCollectionFetching } from '../../redux/shop/shopSelectors';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	withSpinner
)(CollectionsOverview);

export { CollectionsOverviewContainer };
