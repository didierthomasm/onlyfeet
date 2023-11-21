import {gql} from '@apollo/client';

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
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }  
}
`;

export const UPDATE_USER = gql`
mutation updateUser($firstName: String!, $lastName: String!, $username: String!, $bio: String!) {
  updateUser(firstName: $firstName, lastName: $lastName, username: $username, bio: $bio) {
    firstName
    lastName
    username
    bio
  }
}
`;

export const ADD_FOLLOWER = gql`
mutation addFollower($followerId: ID!, $followingId: ID!) {
  addFollower(followerId: $followerId, followingId: $followingId) {
    _id
    followers {
      _id
    }
  }
}
`;

export const REMOVE_FOLLOWER = gql`
mutation removeFollower($followerId: ID!, $followingId: ID!) {
  removeFollower(followerId: $followerId, followingId: $followingId) {
    _id
    followers {
      _id
    }
  }
}
`;

export const ADD_CREDITS = gql`
mutation addCredits($userId: ID!, $credits: Int!) {
  addCredits(userId: $userId, credits: $credits) {
    _id
    credits
  }
}
`;

export const REMOVE_CREDITS = gql`
mutation removeCredits($userId: ID!, $credits: Int!) {
  removeCredits(userId: $userId, credits: $credits) {
    _id
    credits
  }
}
`;

/*export const ADD_POST = gql`
mutation addPost($postText: String!) {
  addPost(postText: $postText) {
    _id
    postText
    createdAt
    username
    commentCount
    comments {
      _id
      createdAt
      username
      commentText
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($postId: ID!, $commentText: String!) {
  addComment(postId: $postId, commentText: $commentText) {
    _id
    commentCount
    comments {
      _id
      commentText
      createdAt
      username
    }
  }
}
`;

export const REMOVE_POST = gql`
mutation removePost($postId: ID!) {
  removePost(postId: $postId) {
    _id
    postText
    createdAt
    username
    commentCount
    comments {
      _id
      createdAt
      username
      commentText
    }
  }
}
`;

export const REMOVE_COMMENT = gql`
mutation removeComment($postId: ID!, $commentId: ID!) {
  removeComment(postId: $postId, commentId: $commentId) {
    _id
    commentCount
    comments {
      _id
      commentText
      createdAt
      username
    }
  }
}
`;

export const UPDATE_POST = gql`
mutation updatePost($postId: ID!, $postText: String!) {
  updatePost(postId: $postId, postText: $postText) {
    _id
    postText
    createdAt
    username
    commentCount
    comments {
      _id
      createdAt
      username
      commentText
    }
  }
}
`;

export const UPDATE_COMMENT = gql`
mutation updateComment($postId: ID!, $commentId: ID!, $commentText: String!) {
  updateComment(postId: $postId, commentId: $commentId, commentText: $commentText) {
    _id
    commentCount
    comments {
      _id
      commentText
      createdAt
      username
    }
  }
}
`;*/

