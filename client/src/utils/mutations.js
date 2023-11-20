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

export const ADD_VIDEO = gql`
  mutation addVideo($public_id: String!, $secure_url: String!, $playback_url: String, $width: Int, $height: Int, $format: String, $resource_type: String, $folder: String, $duration: Int, $created_at: DateTime, $user: ID!) {
    addVideo(public_id: $public_id, secure_url: $secure_url, playback_url: $playback_url, width: $width, height: $height, format: $format, resource_type: $resource_type, folder: $folder, duration: $duration, created_at: $created_at, user: $user) {
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
      }
    }
  }
`;

// Mutation for adding an image
export const ADD_IMAGE = gql`
  mutation addImage($public_id: String!, $secure_url: String!, $width: Int, $height: Int, $format: String, $resource_type: String, $folder: String, $created_at: DateTime, $user: ID!) {
    addImage(public_id: $public_id, secure_url: $secure_url, width: $width, height: $height, format: $format, resource_type: $resource_type, folder: $folder, created_at: $created_at, user: $user) {
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
      }
    }
  }
`;
