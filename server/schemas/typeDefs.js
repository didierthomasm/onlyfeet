const typeDefs = `
# A scalar type for Dates
scalar DateTime
# Represents a user in the system
  type User {
    _id: ID!
    firstName: String!  # First name of the user
    lastName: String!   # Last name of the user
    username: String!   # Unique username
    email: String!      # Email address, must be unique
    credits: Int        # Credits available to the user for transactions
    fullName: String    # Full name of the user (derived from first and last name)
    bio: String         # Biography of the user
    subscribedTo: [Subscription] # Subscriptions made by the user
    content: [Content]  # Content created by the user
    followers: [User]   # Users following this user
    following: [User]   # Users followed by this user
  }

# Authentication data including the token and associated user
  type Auth {
    token: ID!  # JWT token for authenticated sessions
    user: User  # The user related to this authentication token
  }
  
# Represents a content item in the system
  type Content {
    _id: ID!
    creator: ID!        # ID of the creator user
    title: String!      # Title of the content
    description: String # Description of the content
    price: Int          # Price of the content
    type: String        # Type of content (e.g., 'video', 'audio', 'text')
    created_at: DateTime # Date the content was created
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
    users(limit: Int, skip: Int): [User]!       # Retrieve all users
    searchUsers(searchTerm: String): [User]!    # Search for users by username
    user(userId: ID!): User # Retrieve a single user by ID
    me: User             # Retrieve the logged-in user
    subscriptions:[Subscription] # Retrieve all subscriptions
    subscription(subId:ID!): Subscription # Retrieve a single subscription by ID
    contents: [Content]   # Retrieve all content
    content(contentId: ID!): Content # Retrieve a single content item by ID
  }

# Root mutation type
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!, created_at: DateTime, credits: Int): Auth
    updateUser(firstName: String!, lastName: String!, username: String!, bio: String!): User
    addSubscription(follower: ID!, creator: ID!, startDate: DateTime, endDate: DateTime, isActive: Boolean, subscriptionType: String): Subscription
    login(email: String!, password: String!): Auth
    removeUser: User
    addContent(creator: ID!, title: String!, description: String, price: Int, type: String, url: String, created_at: DateTime): Content
    removeContent(contentId: ID!): Content
    addCredits(credits: Int!): User
    removeCredits(credits: Int!): User
    addFollower(followerId: ID!, followingId: ID!): User
    removeFollower(followerId: ID!, followingId: ID!): User
  }
`;

module.exports = typeDefs;
