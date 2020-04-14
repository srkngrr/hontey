import { createSelector } from 'reselect'; // for not to rerendering 

const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart], cart => cart.cartItems);

export const selectCartItemsCount = createSelector([selectCartItems], cartItems => cartItems.reduce(
	(accquantity, cartItem) => accquantity + cartItem.quantity , 0)
) 