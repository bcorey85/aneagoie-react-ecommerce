import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user/userReducer';
import { cartReducer } from './cart/cartReducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [ 'cart' ]
};

const rootReducerBase = combineReducers({
	user: userReducer,
	cart: cartReducer
});

const rootReducer = persistReducer(persistConfig, rootReducerBase);

export { rootReducer };
