const { User, Content, Subscription } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
console.log(User, `User=${User}`)
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

        /*me: async (parent, args, context) => {
            if (context.user) {
                try {
                    return await User.findOne({ _id: context.user._id });
                } catch (error) {
                    throw new Error('Error fetching current user');
                }
            }
            throw new AuthenticationError('Not authenticated');
        }*/
    },
    Mutation: {
        addUser: async (parent, { firstName, lastName, email, password, role, created_at, credits }) => {
            const user = await User.create({ firstName, lastName, username, email, password, role, created_at, credits });
            const token = signToken(user);

            return { token, user };
        },

        addSubscription: async (parent, { follower, creator, startDate, endDate, isActive, subscriptionType }) => {
            const subscription = await Subscription.create({ follower, creator, startDate, endDate, isActive, subscriptionType });
            // const token = signToken(subscription);

            // return { token, subscription };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            if (User.userRole != 0 || 1 || 2) {
                console.log(User.userRole)
                throw new AuthenticationError('Not authorized to view this content');
            }

            const token = signToken(user);
            return { token, user };
        },

        removeUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('Not authenticated');
        }
    }
};

module.exports = resolvers;