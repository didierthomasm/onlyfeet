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
    }
  }
`;