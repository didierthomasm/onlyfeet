const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// Use the secret key from environment variables
const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION || '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ( {req} ) {
    //console.log('JWT Secret:', secret); // log the JWT secret for debugging
    //console.log('Headers:', req.headers); // log all headers
    // console.log(req);
    // initialize token as undefined
    let token;
    

    // check if the authorization header is present
    if (req.headers.authorization) {
      // extract the token from the authorization header
      const authHeader = req.headers.authorization;
      token = authHeader.split(' ')[1]; // this assumes the format is "Bearer <token>"

      console.log('Received Token:', token); // log the extracted token, i dont know why this does not work
    }

    if (token) {
      try {
        // verify the token
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data; // add the user data to the request object
      } catch (error) {
        console.error('Error verifying token:', error.message);
      }
    }

    return req; // Return the modified request object
  },
  signToken: function ({ email, _id }) {
    //console.log('Signing Token - JWT Secret:', secret); // Log when signing a token
    const payload = { email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
