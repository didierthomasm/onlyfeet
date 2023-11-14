import gql from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!: $userRole: Number!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password, userRole: $userRole) {
      token
      user {
        _id
        username
      }
    }
  }
`;
