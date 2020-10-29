import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDk7oHYfdQqIDaRmdKS8S09NPoevxFEbpg',
	authDomain: 'crown-db-bdea9.firebaseapp.com',
	databaseURL: 'https://crown-db-bdea9.firebaseio.com',
	projectId: 'crown-db-bdea9',
	storageBucket: 'crown-db-bdea9.appspot.com',
	messagingSenderId: '504698281653',
	appId: '1:504698281653:web:0aedbcaaeb701a32fc28fc',
	measurementId: 'G-XK5BLE74XK'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) {
		return;
	}

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});

	return transformedCollection.reduce((acc, collection) => {
		acc[collection.title.toLowerCase()] = collection;
		return acc;
	}, {});
};

export default firebase;
