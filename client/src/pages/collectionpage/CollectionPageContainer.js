import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { withSpinner } from '../../components/withSpinner/withSpinner';
import { CollectionPage } from './CollectionPage';

import { selectIsCollectionLoaded } from '../../redux/shop/shopSelectors';

const mapStateToProps = createStructuredSelector({
	isLoading: state => !selectIsCollectionLoaded(state)
});

const CollectionPageContainer = compose(connect(mapStateToProps), withSpinner)(
	CollectionPage
);

export { CollectionPageContainer };
