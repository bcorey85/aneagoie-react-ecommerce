import { ShopActionTypes } from './shopTypes';

import {
	firestore,
	convertCollectionsSnapshotToMap
} from '../../firebase/firebase';

export const fetchCollectionsStart = () => {
	return {
		type: ShopActionTypes.FETCH_COLLECTIONS_START
	};
};

export const fetchCollectionsSuccess = collectionsMap => {
	return {
		type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
		payload: collectionsMap
	};
};

export const fetchCollectionsError = errorMessage => {
	return {
		type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
		payload: errorMessage
	};
};

// Main action used, calls start, success, failure actions over async lifespan
export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		const collectionRef = firestore.collection('collections');
		dispatch(fetchCollectionsStart());

		collectionRef
			.get()
			.then(snapshot => {
				const collectionsMap = convertCollectionsSnapshotToMap(
					snapshot
				);
				dispatch(fetchCollectionsSuccess(collectionsMap));
			})
			.catch(err => {
				dispatch(fetchCollectionsError(err.message));
			});
	};
};
