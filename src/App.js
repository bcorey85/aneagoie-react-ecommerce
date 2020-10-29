import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/homepage/HomePage';
import { ShopPage } from './pages/shoppage/ShopPage';
import { SignInandSignUp } from './pages/signinandsignup/SignInandSignUp';
import { CheckoutPage } from './pages/checkout/CheckoutPage';

import { selectCurrentUser } from './redux/user/userSelectors';
import { checkUserSession } from './redux/user/userActions';
import './App.css';

class AppBase extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { checkUserSession } = this.props;
		checkUserSession();
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
		checkUserSession: () => dispatch(checkUserSession())
	};
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppBase);
