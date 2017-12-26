const { 
    GraphQLList,
    GraphQLString 
} = require('graphql')
const chai = require('chai')

const authorType = require('./author')
const bookType = require('./book')
const expect = chai.expect

describe('Author', () => {
    it('should have books field of type GraphQLList', () => {
        expect(authorType.getFields()).to.have.property('books')
        expect(authorType.getFields().books.type).to.deep.equals(GraphQLList(bookType))
    })

    it('should have name field of type String', () => {
        expect(authorType.getFields()).to.have.property('name')
        expect(authorType.getFields().name.type).to.deep.equals(GraphQLString)
    })
})