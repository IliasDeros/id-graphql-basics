const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt
} = require('graphql')

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'optional?',

    fields(){
        return {
            name: { 
                type: GraphQLString,
                resolve(xml){
                    return xml.GoodreadsResponse.author[0].name[0]
                }
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
                        let response = await fetch(
                            `https://www.goodreads.com/author/show.xml?key=${process.env.APIKEY}&id=${args.id}`
                        )
                        let responseXml = await response.text()
                        return await parseXML(responseXml)
                    }
                }
            }
        }
    })
})