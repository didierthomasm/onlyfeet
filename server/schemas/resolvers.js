const { User, Content, Subscription } = require('../models');
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

/*        me: async (parent, args, context) => {
            if (context.user) {
                try {
                    return await User.findOne({ _id: context.user._id });
                } catch (error) {
                    throw new Error('Error fetching current user');
                }
            }
            throw AuthenticationError;
        }*/
    },
    Mutation: {
        addUser: async (parent, { firstName, lastName, email, username, password, role, created_at, credits }) => {
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
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

/*            if (User.role !== 0 && User.role !== 1 && User.role !== 2) {
                console.log(User.role)
                throw AuthenticationError;
            }*/

            const token = signToken(user);
            return { token, user };
        },

        removeUser: (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({_id: context.user._id});
            }
            throw AuthenticationError;
        }
    },
    DateTime: DateTime
};

module.exports = resolvers;