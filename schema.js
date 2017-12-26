const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')

async function getJSON(url){        
    let response = await fetch(url),
        responseXml = await response.text()

    return await parseXML(responseXml)
}

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'optional?',

    fields(){
        return {
            books: { 
                type: GraphQLList(BookType),
                async resolve(xml){
                    const ids = xml.GoodreadsResponse.author[0].books[0].book.map(b => b.id[0]._)
                    return Promise.all(ids.map(id => 
                        getJSON(`https://www.goodreads.com/book/show/${id}.xml?key=${process.env.APIKEY}`)
                    ))
                }
            },
            name: { 
                type: GraphQLString,
                resolve(xml){
                    return xml.GoodreadsResponse.author[0].name[0]
                }
            }
        }
    }
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'optional...',

    fields(){
        return {
            isbn: {
                type: GraphQLString,
                resolve(xml){ return xml.GoodreadsResponse.book[0].isbn[0] }
            },
            title: { 
                type: GraphQLString,
                resolve(xml){ return xml.GoodreadsResponse.book[0].title[0] }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'possibly optional',

        fields(){
            return {
                author: {
                    type: AuthorType,
                    args: {
                        id: { type: GraphQLInt }
                    },
                    async resolve(root, args){
                        return getJSON(`https://www.goodreads.com/author/show.xml?key=${process.env.APIKEY}&id=${args.id}`)
                    }
                }
            }
        }
    })
})