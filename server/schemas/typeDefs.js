const typeDefs = `
type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    role: Int
    credits: Int
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]!
    user(userId: ID!): User
    subscriptions:[Subscription]
    subscription(subId:ID!): Subscription
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, role: Int, created_at: Date, credits: Int): Auth
    addSubscription(follower: Int!, creator: Int!, startDate: Date, endDate: Date, isActive: Boolean, subscriptionType: String)
    login(email: String!, password: String!): Auth
    removeUser: User
}
`;

module.exports = typeDefs;
