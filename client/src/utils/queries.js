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
        
      },
      following {
        _id
        
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
        
      },
      following {
        _id
        
      }
    }
  }
`;