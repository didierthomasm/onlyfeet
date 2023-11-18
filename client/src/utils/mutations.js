import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $role: String, $created_at: DateTime, $credits: Int) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: $role, created_at: $created_at, credits: $credits) {
      token
      user {
        _id
        firstName
        lastName
        email
        role
      }
    }
  }
`;

export const ADD_SUBSCRIPTION = gql`
  mutation addSubscription($follower: ID!, $creator: ID!, $startDate: DateTime, $endDate: DateTime, $isActive: Boolean, $subscriptionType: String) {
    addSubscription(follower: $follower, creator: $creator, startDate: $startDate, endDate: $endDate, isActive: $isActive, subscriptionType: $subscriptionType) {
      _id
      startDate
      endDate
      subscriptionType
    }
  }
`;

export const REMOVE_SUBSCRIPTION = gql`
  mutation removeSubscription($subscriptionId: ID!) {
    removeSubscription(subscriptionId: $subscriptionId) {
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
