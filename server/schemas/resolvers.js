const { User, Content, Subscription, Video, Image } = require('../models');
const { signToken } = require('../utils/auth');
const { DateTime } = require("./scalar");
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            try {
                return await User.find();
            } catch (error) {
                throw new Error('Error fetching users');
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
                throw new Error('Error fetching subscriptions');
            }
        },
        subscription: async (parent, { subscriptionId }) => {
            try {
                return await Subscription.findOne({ _id: subscriptionId });
            } catch (error) {
                throw new Error('Error fetching subscription');
            }
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
        addUser: async (parent, { firstName, lastName, email, password, role, created_at, credits }) => {
            const user = await User.create({ firstName, lastName, email, password, role, created_at, credits });
            const token = signToken(user);

            return { token, user };
        },
        addSubscription: async (parent, { follower, creator, startDate, endDate, isActive, subscriptionType }) => {
            const subscription = await Subscription.create({ follower, creator, startDate, endDate, isActive, subscriptionType });
            // const token = signToken(subscription);

            // return { token, subscription };
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
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('User not found.');
            }

            // Log the email and entered password (for debugging)
            // console.log(`Login attempt for email: ${email}, Entered Password: ${password}`);

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password.');
            }

            const token = signToken(user);
            return { token, user };
        },
        removeUser: (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
    },
    DateTime: DateTime
};

module.exports = resolvers;
