const typeDefs = `
  # A scalar type for Dates
  scalar DateTime

  # Represents a user in the system
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String
    credits: Int
  }

  # Authentication data including the token and associated user
  type Auth {
    token: ID!
    user: User
  }

  # A subscription made by a follower to a creator
  type Subscription {
    _id: ID!
    follower: ID!
    creator: ID!
    startDate: DateTime
    endDate: DateTime
    isActive: Boolean
    subscriptionType: String
  }

  # Represents a video in the system
  type Video {
    _id: ID!
    public_id: String!
    secure_url: String!
    playback_url: String
    width: Int
    height: Int
    format: String
    resource_type: String
    folder: String
    duration: Int
    created_at: DateTime
    user: User!
  }

  # Represents an image in the system
  type Image {
    _id: ID!
    public_id: String!
    secure_url: String!
    width: Int
    height: Int
    format: String
    resource_type: String
    folder: String
    created_at: DateTime
    user: User!
  }

  # Root query type
  type Query {
    users: [User]!
    user(userId: ID!): User
    subscriptions: [Subscription]!
    subscription(subId: ID!): Subscription
    videosByUser(userId: ID!): [Video]!
    imagesByUser(userId: ID!): [Image]!
  }

  # Root mutation type
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, role: String, created_at: DateTime, credits: Int): Auth
    addSubscription(follower: ID!, creator: ID!, startDate: DateTime, endDate: DateTime, isActive: Boolean, subscriptionType: String): Subscription
    addVideo(public_id: String!, secure_url: String!, playback_url: String, width: Int, height: Int, format: String, resource_type: String, folder: String, duration: Int, created_at: DateTime, user: ID!): Video
    deleteVideo(videoId: ID!): Video
    addImage(public_id: String!, secure_url: String!, width: Int, height: Int, format: String, resource_type: String, folder: String, created_at: DateTime, user: ID!): Image
    deleteImage(imageId: ID!): Image
    login(email: String!, password: String!): Auth
    removeUser: User
  }
`;

module.exports = typeDefs;
