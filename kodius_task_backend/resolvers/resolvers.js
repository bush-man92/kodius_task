
import { allUsers, getUser, updateUser, deleteUser, register, login, logout, banUser, userOverview } from './user-resolvers'
import { allItems, addItem, itemsOverview } from './item-resolvers'
import { addToCart, cartView } from './cart-resolvers'
import { createPurchase } from './purchase-resolvers'
import { createCupon } from './cupon-resolvers'

const resolvers = {
	Query: {
		allUsers,
		allItems,
		getUser,
		userOverview,
		itemsOverview,
		cartView,
	},
	
	Mutation: {
		createCupon,
		createPurchase,
		addToCart,
		addItem,
		updateUser,
		deleteUser,
		register,
		login,
		logout,
		banUser,
	},
};

export default resolvers;