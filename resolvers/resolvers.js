
import { allUsers, getUser, updateUser, deleteUser, register, login, logout, banUser, validToken, userOverview } from './user-resolvers'

const resolvers = {
	Query: {
		allUsers,
		getUser,
		userOverview
	},
	
	Mutation: {
		addMessage,
		updateUser,
		deleteUser,
		register,
		login,
		logout,
		banUser,
		validToken
	},
};

export default resolvers;