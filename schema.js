const { GraphQLSchema } = require('graphql')

const QueryType = require('./types/query')

module.exports = new GraphQLSchema({
    query: QueryType
})