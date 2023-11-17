import gql from '@apollo/client';

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
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!: $role: Number!, $created_at: Date, $credits: Int) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: $userRole) {
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

export const ADD_SUBSCRIPTION = gql`{
  mutation addSubscription($follower: ID!, $creator: ID!, $startDate: Date, $endDate: Date, $isActive: Boolean, $subscriptionType: String){
    addSubscription(follower: $follower, creator: $creator, startDate: $startDate, endDate: $endDate, isActive: $isActive, subscriptionType: $subscriptionType){
      _id
      startDate
      endDate
      subscriptionType
    }
  }
}`;

export const REMOVE_SUBSCRIPTION = gql`{
  mutation removeSubscription($subscriptionId: ID){
    removeSubscription(_id: subscriptionId){
      _id
      firstName
      lastName
      email
      role
      credits
      subscribedTo
    }
  }
}`;
