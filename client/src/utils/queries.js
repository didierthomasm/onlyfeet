import {gql} from '@apollo/client';

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      firstName
      lastName
      fullName
      bio
      email
      followers {
        _id
        fullName
        username        
      }
      following {
        _id
        fullName
        username
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      firstName
      lastName
      fullName
      bio
      email
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($searchTerm: String) {
    searchUsers(searchTerm: $searchTerm) {
      _id
      username
      firstName
      lastName
      fullName
      bio
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      firstName
      lastName
      fullName
      bio
      email
      credits
      followers {
        _id
        fullName
        username        
      }
      following {
        _id
        fullName
        username
      }
      content {
        _id
        title
        description
        price
      }
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