const { User, Content, Subscription, Video, Image } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const {DateTime} = require("./scalar");

const resolvers = {
    Query: {
        users: async () => {
            try {
                return await User.find();
            } catch (error) {
                throw new Error('Error fetching users');
            }
        },

        searchUsers: async (parent, { searchTerm }) => {
            try {
                if (searchTerm) {
                    return await User.find({
                        // Assuming you want to search by username
                        username: { $regex: searchTerm, $options: 'i' }
                    });
                } else {
                    return await User.find();
                }
            } catch (error) {
                throw new Error('Error searching users');
            }
        },

        user: async (parent, { userId }) => {
            try {
                return await User.findOne({ _id: userId });
            } catch (error) {
                throw new Error('Error fetching user');
            }
        },

        subscriptions: async () => {
            try {
                return await Subscription.find();
            } catch (error) {
                throw new Error('Error fetching users');
            }
        },

        subscription: async (parent, { subscriptionId }) => {
            try {
                return await Subscription.findOne({ _id: subscriptionId });
            } catch (error) {
                throw new Error('Error fetching user');
            }
        },

        me: async (parent, args, context) => {
            if (context.user) {
                try {
                    return await User.findOne({ _id: context.user._id });
                } catch (error) {
                    throw new Error('Error fetching current user');
                }
            }
            throw AuthenticationError;
        },

        videosByUser: async (parent, { userId }) => {
            try {
                return await Video.find({ user: userId });
            } catch (error) {
                throw new Error('Error fetching videos by user');
            }
        },

        imagesByUser: async (parent, { userId }) => {
            try {
                return await Image.find({ user: userId });
            } catch (error) {
                throw new Error('Error fetching images by user');
            }
        },
    },
    Mutation: {
        addUser: async (parent, { firstName, lastName, email, username, password, created_at, credits }) => {
            const user = await User.create({ firstName, lastName, username, email, password, created_at, credits });
            const token = signToken(user);

            return { token, user };
        },

        addSubscription: async (parent, { follower, creator, startDate, endDate, isActive, subscriptionType }) => {
            const subscription = await Subscription.create({ follower, creator, startDate, endDate, isActive, subscriptionType });
            const token = signToken(subscription);

            return { token, subscription };
        },

        addContent: async (parent, { creator, title, description, price, type, url, created_at }) => {
            const content = await Content.create({ creator, title, description, price, type, url, created_at });
            const token = signToken(content);

            return { token, content };
        },

        addCredits: async (parent, {userId, credits}, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }

            const updatedUser = await User.findByIdAndUpdate(
              userId,
              {$inc: {credits: credits}},
              {new: true, runValidators: true}
            );
            return updatedUser;
        },

        removeCredits: async (parent, {userId, credits }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }

            const updatedUser = await User.findByIdAndUpdate(
              userId,
              {$inc: {credits: -credits}},
              {new: true, runValidators: true}
            );
            return updatedUser;
        },

        addFollower: async (parent, { followerId, followingId }, context) => {
            // Ensure the user is authenticated and can follow others
            if (!context.user || context.user._id !== followerId) {
                throw AuthenticationError;
            }

            // Add the following user to the follower's 'following' array
            await User.findByIdAndUpdate(followerId, {
                $addToSet: { following: followingId }
            });

            // Add the follower to the following user's 'followers' array
            await User.findByIdAndUpdate(followingId, {
                $addToSet: { followers: followerId }
            });

            // Return the updated user data or any other relevant data
            return User.findById(followerId);
        },

        removeFollower: async (parent, { followerId, followingId }, context) => {
            // Ensure the user is authenticated and can unfollow others
            if (!context.user || context.user._id !== followerId) {
                throw AuthenticationError;
            }

            // Remove the following user from the follower's 'following' array
            await User.findByIdAndUpdate(followerId, {
                $pull: { following: followingId }
            });

            // Remove the follower from the following user's 'followers' array
            await User.findByIdAndUpdate(followingId, {
                $pull: { followers: followerId }
            });

            // Return the updated user data or any other relevant data
            return User.findById(followerId);
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        removeUser: (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({_id: context.user._id});
            }
            throw AuthenticationError;
        },

        updateUser: async (parent, {firstName, lastName, username, bio }, context) => {

            if (context.user) {
                return User.findOneAndUpdate(
                  { _id: context.user._id },
                  { firstName, lastName, username, bio },
                  { new: true }
                );
            }
            throw AuthenticationError;
        },
        addVideo: async (parent, { public_id, secure_url, playback_url, width, height, format, resource_type, folder, duration, created_at, user }) => {
            try {
                const video = await Video.create({ public_id, secure_url, playback_url, width, height, format, resource_type, folder, duration, created_at, user });
                return video;
            } catch (error) {
                throw new Error('Error adding video');
            }
        },
        deleteVideo: async (parent, { videoId }) => {
            try {
                const deletedVideo = await Video.findOneAndDelete({ _id: videoId });
                if (!deletedVideo) {
                    throw new Error('Video not found');
                }
                return deletedVideo;
            } catch (error) {
                throw new Error('Error deleting video');
            }
        },
        addImage: async (parent, { public_id, secure_url, width, height, format, resource_type, folder, created_at, user }) => {
            try {
                const image = await Image.create({ public_id, secure_url, width, height, format, resource_type, folder, created_at, user });
                return image;
            } catch (error) {
                throw new Error('Error adding image');
            }
        },
        deleteImage: async (parent, { imageId }) => {
            try {
                const deletedImage = await Image.findOneAndDelete({ _id: imageId });
                if (!deletedImage) {
                    throw new Error('Image not found');
                }
                return deletedImage;
            } catch (error) {
                throw new Error('Error deleting image');
            }
        },
    },
    DateTime: DateTime
};

module.exports = resolvers;