import gql  from 'graphql-tag';

export default gql`

	type User {
		id: Int!
		username: String!
		email: String!
		password: String!
	}

	type userView {
		username: String!
		id: Int!
		is_logged_in: Boolean!
	}

	type validToken {
		response: String!
		id: Int!
	}

	type Query {
		allUsers: [User!]!
		getUser(username: String, id: Int): User!
		user(id:Int, search:String):User
		userOverview(id:Int!): [userView]
	}

	type Mutation {
    	register(username: String!, password: String!, email: String!): String!
    	login(username: String, password: String, used_token: String): String!
    	logout(logged_token: String!): String!
    	updateUser(username: String, newUsername: String, password: String, newPassword: String, token: String!): [String]
    	deleteUser(id: Int!): Int!
		banUser(token: String!, username: String!): String!
		validToken(token: String!): validToken
	}

	schema {
		query: Query
		mutation: Mutation
}
`;