const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)

module.exports = {
    async getJSON (url) {
        let response = await fetch(url),
            responseXml = await response.text()

        return await parseXML(responseXml)
    }
}