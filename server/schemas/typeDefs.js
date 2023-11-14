const typeDefs = `
type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    userRole: Int
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]!
    user(userId: ID!): User
}

type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!, userRole: Int): Auth
    login(email: String!, password: String!): Auth
    removeUser: User
}
`;

module.exports = typeDefs;
