import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/homepage/HomePage';
import { ShopPage } from './pages/shoppage/ShopPage';
import { SignInandSignUp } from './pages/signinandsignup/SignInandSignUp';
import { CheckoutPage } from './pages/checkout/CheckoutPage';

import { setCurrentUser } from './redux/user/userActions';
import { selectCurrentUser } from './redux/user/userSelectors';
import './App.css';

class AppBase extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		// returns cleanup/logout function
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				// check to see if user is persisted in db, if not save to db
				const userRef = await createUserProfileDocument(userAuth);

				// listen to state changes on user data on firebase, returns first initial state
				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				});
			} else {
				setCurrentUser(null);
			}
		});
	}

	componentWillUnmount() {
		// call cleanup/logout function
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route
						exact
						path='/signin'
						render={() =>
							this.props.currentUser ? (
								<Redirect to='/' />
							) : (
								<SignInandSignUp />
							)}
					/>
					<Route exact path='/checkout' component={CheckoutPage} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => {
	return {
		setCurrentUser: user => dispatch(setCurrentUser(user))
	};
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppBase);
