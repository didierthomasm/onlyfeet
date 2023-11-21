import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOWER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { FollowButtonStyled, AddIcon, RemoveIcon } from '../assets/style/Profile/FollowButtonStyle.js';

const FollowButtonComponent = ({ userIdToFollow, isAlreadyFollowing }) => {
  const currentUserId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  // State to manage the following status
  const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing);
  useEffect(() => {
    setIsFollowing(isAlreadyFollowing);
  }, [isAlreadyFollowing]);

  const [addFollower, { loading }] = useMutation(ADD_FOLLOWER, {
    onCompleted: (data) => {
      setIsFollowing(data.addFollower.isFollowing);
    },
    update: (cache, { data: { addFollower } }) => {
      // Here you can directly write to the cache to update local state
      // Example: update the FOLLOWING array for the current user
      const existingUser = cache.readQuery({
        query: QUERY_ME,
        variables: { userId: currentUserId },
      });

      if (existingUser && addFollower) {
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...existingUser.me,
              following: [...existingUser.me.following, addFollower],
            },
          },
        });
      }
    },
    onError: (error) => {
      console.error('Error following user:', error);
    },
  });

  const handleFollow = async () => {
    try {
      await addFollower({
        variables: { followerId: currentUserId, followingId: userIdToFollow },
      });
    } catch (e) {
      console.error('Error following user:', e);
    }
  };

  if (currentUserId && currentUserId !== userIdToFollow) {
    return (
      <FollowButtonStyled $isFollowing={isFollowing} onClick={handleFollow} disabled={loading}>
        {loading ? (
          'Processing...'
        ) : isFollowing ? (
          <>
            <RemoveIcon /> Unfollow
          </>
        ) : (
          <>
            <AddIcon /> Follow
          </>
        )}
      </FollowButtonStyled>
    );
  }

  return null; // or some other indication that the user cannot follow themselves
};

export default FollowButtonComponent;
