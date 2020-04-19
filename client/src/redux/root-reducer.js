import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; // When you refresh you are not losing data (cart reducer)
import storage from 'redux-persist/lib/storage'; // local storage all the time there, sessionStorage is when you close tabs all gone

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {  // When you refresh you are not losing data (cart reducer)
	key: 'root',
	storage,
	whitelist: ['cart']
}

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	directory: directoryReducer,
	shop: shopReducer
}) 

export default persistReducer(persistConfig, rootReducer) 