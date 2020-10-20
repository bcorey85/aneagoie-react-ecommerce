import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/homepage/HomePage';
import { ShopPage } from './pages/shoppage/ShopPage';
import { SignInandSignUp } from './pages/signinandsignup/SignInandSignUp';
import { auth } from './firebase/firebase';

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
		this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
			this.setState({ currentUser: user });
			console.log(user);
		});
	}

	componentWillUnmount() {
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
