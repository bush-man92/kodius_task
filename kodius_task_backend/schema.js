import gql  from 'graphql-tag';

export default gql`

	type User {
		id: Int!
		username: String!
		email: String!
		password: String!
	}

	type Item {
		id: Int!
		name: String!
		price: Int!
		picture: String
		about: String
	}

	type userView {
		username: String!
		id: Int!
		is_logged_in: Boolean!
	}

	type itemView {
		id: Int!
		name: String!
		price: Int!
		picture: String
		about: String
	}

	type cartView {
		item_id: Int!
		item_name: String!
		item_quantity: Int!
		item_price: Int!
	}

	type Response {
		response: String!
		id: Int!
	}

	type PurchaseResponse {
		item_id: Int!
		item_name: String!
		item_quantity: Int!
		item_price: Int!
		total_price: Int!
		cupon_password: String
	}

	type Query {
		cartView(id:Int!): [cartView]
		allUsers: [User]
		getUser(username: String, id: Int): User!
		allItems: [Item]
		user(id:Int, search:String):User
		userOverview(id:Int!): [userView]
		itemsOverview(name: String): [itemView]
	}

	type Mutation {
		createCupon(discount: Int!, cupon_password: String!, modifier: String!): String!
		createPurchase(email: String!, address: String!, security_number: String!, credit_card: String!, cupon_password: String): [PurchaseResponse]
		addToCart(token: String!, item_id: Int!, modifier: String!): String
		addItem(name: String!, price: Int!, picture: String, about: String): String!
    	register(username: String!, password: String!, email: String!): Response!
    	login(username: String, password: String): Response!
    	logout(logged_token: String!): String!
    	updateUser(username: String, newUsername: String, password: String, newPassword: String, token: String!): [String]
    	deleteUser(id: Int!): Int!
		banUser(token: String!, username: String!): String!
	}

	schema {
		query: Query
		mutation: Mutation
}
`;