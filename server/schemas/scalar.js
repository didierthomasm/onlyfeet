const { GraphQLScalarType, Kind } = require('graphql');

const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A date and time, represented as an ISO-8601 string',
  serialize(value) {
    // Convert outgoing Date to ISO String for GraphQL
    return value.toISOString();
  },
  parseValue(value) {
    // Convert incoming ISO String to a Date for JavaScript
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // Convert string literals in queries to a Date
      return new Date(ast.value);
    }
    return null; // Invalid input should return null
  }
});

module.exports = {
  DateTime: dateTimeScalar
};
