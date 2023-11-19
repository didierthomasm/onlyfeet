const typeDefs = `
# A scalar type for Dates
scalar DateTime
# Represents a user in the system
  type User {
    _id: ID!
    firstName: String!  # First name of the user
    lastName: String!   # Last name of the user
    # username: String!   Unique username
    email: String!      # Email address, must be unique
    role: String        # Role of the user in the system (e.g., 'creator', 'follower')
    credits: Int        # Credits available to the user for transactions
    # fullName: String    Full name of the user (derived from first and last name)
  }

# Authentication data including the token and associated user
  type Auth {
    token: ID!  # JWT token for authenticated sessions
    user: User  # The user related to this authentication token
  }

# A subscription made by a follower to a creator
  type Subscription {
    _id: ID!
    follower: ID!      # ID of the follower user
    creator: ID!       # ID of the creator user
    startDate: DateTime # Start date of the subscription
    endDate: DateTime   # End date of the subscription
    isActive: Boolean   # Indicates if the subscription is currently active
    subscriptionType: String # Type of the subscription
  }

# Root query type
  type Query {
    users: [User]!       # Retrieve all users
    user(userId: ID!): User # Retrieve a single user by ID
    subscriptions:[Subscription] # Retrieve all subscriptions
    subscription(subId:ID!): Subscription # Retrieve a single subscription by ID
  }

# Root mutation type
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, role: String, created_at: DateTime, credits: Int): Auth
    addSubscription(follower: ID!, creator: ID!, startDate: DateTime, endDate: DateTime, isActive: Boolean, subscriptionType: String): Subscription
    login(email: String!, password: String!): Auth
    removeUser: User
  }
`;

module.exports = typeDefs;
