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