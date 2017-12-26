const getJSON = require('../utils').getJSON
const {
    GraphQLObjectType,
    GraphQLInt
} = require('graphql')

const AuthorType = require('./author')

module.exports = new GraphQLObjectType({
    name: 'Query',
    description: 'possibly optional',

    fields() {
        return {
            author: {
                type: AuthorType,
                args: {
                    id: { type: GraphQLInt }
                },
                async resolve(root, args) {
                    return getJSON(`https://www.goodreads.com/author/show.xml?key=${process.env.APIKEY}&id=${args.id}`)
                }
            }
        }
    }
})