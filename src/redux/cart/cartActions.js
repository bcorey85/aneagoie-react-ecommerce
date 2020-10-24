import { CartActionTypes } from './cartTypes';

export const toggleCartHidden = () => {
	return { type: CartActionTypes.TOGGLE_CART_HIDDEN };
};
