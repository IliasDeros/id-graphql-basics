const getJSON = require('../utils').getJSON
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql')

const BookType = require('./book')

module.exports = new GraphQLObjectType({
    name: 'Author',
    description: 'optional?',

    fields() {
        return {
            books: {
                type: GraphQLList(BookType),
                async resolve(xml) {
                    const ids = xml.GoodreadsResponse.author[0].books[0].book.map(b => b.id[0]._)
                    return Promise.all(ids.map(id =>
                        getJSON(`https://www.goodreads.com/book/show/${id}.xml?key=${process.env.APIKEY}`)
                    ))
                }
            },
            name: {
                type: GraphQLString,
                resolve(xml) {
                    return xml.GoodreadsResponse.author[0].name[0]
                }
            }
        }
    }
})