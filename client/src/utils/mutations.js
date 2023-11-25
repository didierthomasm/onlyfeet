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


export const ADD_CONTENT = gql`
mutation addContent($creator: ID!, $title: String!, $description: String, $price: Int, $contentType: String, $datePosted: DateTime) {
    addContent(creator: $creator, title: $title, description: $description, price: $price, contentType: $contentType, datePosted: $datePosted) {
        title
        description
        price
        contentType
        datePosted
        creator 
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