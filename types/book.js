const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
    name: 'Book',
    description: 'optional...',

    fields() {
        return {
            isbn: {
                type: GraphQLString,
                resolve(xml) { return xml.GoodreadsResponse.book[0].isbn[0] }
            },
            title: {
                type: GraphQLString,
                resolve(xml) { return xml.GoodreadsResponse.book[0].title[0] }
            }
        }
    }
})