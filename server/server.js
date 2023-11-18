const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
//const { connectDB } = require('./config/db.js');
const { errorHandler } = require('./middlewares/error.js');
const cloudinary = require('./config/cloudinary.js');
const uploadRoutes = require('./routes/upload.js');
const signUploadRoutes = require('./routes/sign-upload.js');

dotenv.config({path:'./.env'})

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  

  //estos app use son para cloudinary

  // app.use(fileUpload());
  // app.use(express.urlencoded({ extended: true }));

  // app.use(express.json());

  app.use('/api/sign-upload', signUploadRoutes)
  app.use('/api/upload', uploadRoutes)

  app.use(errorHandler);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      //connectDB();
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
  startApolloServer();
