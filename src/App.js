import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/homepage/HomePage';
import { ShopPage } from './pages/shoppage/ShopPage';
import { SignInandSignUp } from './pages/signinandsignup/SignInandSignUp';
import { auth, createUserProfileDocument } from './firebase/firebase';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super();

		this.state = {
			currentUser: null
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		// returns cleanup/logout function
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				// check to see if user is persisted in db, if not save to db
				const userRef = await createUserProfileDocument(userAuth);

				// listen to state changes on user data on firebase, returns first initial state
				userRef.onSnapshot(snapShot => {
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data()
						}
					});
				});

				console.log(this.state);
			} else {
				this.setState({ currentUser: null });
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
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/shop' component={ShopPage} />
					<Route exact path='/signin' component={SignInandSignUp} />
				</Switch>
			</div>
		);
	}
}

export default App;
