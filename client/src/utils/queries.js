import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query allUsers{
  users {
    _id
    firstName
    lastName
    email
    role
    credits
  }
}
`;

export const QUERY_SINGLE_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      email
      role
      credits
      subscribedTo
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      role
      credits
      subscribedTo
    }
  }
`;


// Query for fetching videos by a specific user
export const QUERY_VIDEOS_BY_USER = gql`
  query videosByUser($userId: ID!) {
    videosByUser(userId: $userId) {
      _id
      public_id
      secure_url
      playback_url
      width
      height
      format
      resource_type
      folder
      duration
      created_at
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

// Query for fetching images by a specific user
export const QUERY_IMAGES_BY_USER = gql`
  query imagesByUser($userId: ID!) {
    imagesByUser(userId: $userId) {
      _id
      public_id
      secure_url
      width
      height
      format
      resource_type
      folder
      created_at
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;