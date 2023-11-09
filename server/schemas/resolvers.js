const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
  },

  // define mutations for GraphQL
Mutation: {
  // addUser mutation: creates a new user
  addUser: async (parent, { username, email, password }) => {
    // create a new user in the database
    const user = await User.create({ username, email, password });
    // generate a token for the new user
    const token = signToken(user);
    // return the token and user details
    return { token, user };
  },
  // login mutation: authenticates a user
  login: async (parent, { email, password }) => {
    // find the user by email
    const user = await User.findOne({ email });
    // if no user is found, throw an authentication error
    if (!user) {
      throw AuthenticationError;
    }
    // check if the provided password is correct
    const correctPw = await user.isCorrectPassword(password);
    // if the password is incorrect, throw an authentication error
    if (!correctPw) {
      throw AuthenticationError;
    }
    // if authentication is successful, generate a token
    const token = signToken(user);
    // return the token and user details
    return { token, user };
  },
    addThought: async (parent, { thoughtText, thoughtAuthor }) => {
      const thought = await Thought.create({ thoughtText, thoughtAuthor });

      await User.findOneAndUpdate(
        { username: thoughtAuthor },
        { $addToSet: { thoughts: thought._id } }
      );

      return thought;
    },
    addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
