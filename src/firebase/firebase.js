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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
