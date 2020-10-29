import { takeLatest, put, all, call } from 'redux-saga/effects';

import { UserActionTypes } from './userTypes';
import { signInFailure, signInSuccess } from './userActions';
import {
	auth,
	googleProvider,
	createUserProfileDocument
} from '../../firebase/firebase';

export function* getSnapshotFromUserAuth(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);
		const userSnapshot = yield userRef.get();
		yield put(
			signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
		);
	} catch (error) {
		yield put(signInFailure(error.message));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error.message));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload }) {
	const { email, password } = payload;
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		put(signInFailure(error.message));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
	yield all([ call(onGoogleSignInStart), call(onEmailSignInStart) ]);
}
