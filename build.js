const fs = require('fs')
const pkg = require('./package.json')
const config = require('./atlassian-connect.template.json')
const dotenv = require('dotenv');

dotenv.config();

// config.version = pkg.version
// config.baseUrl = process.env.APP_BASE_URL
// config.links.self = process.env.APP_BASE_URL + '/atlassian-connect.json'
// config.links.homepage = process.env.APP_BASE_URL + '/atlassian-connect.json'
const writeStream = fs.createWriteStream('atlassian-connect.json')
writeStream.write(JSON.stringify(config))
writeStream.end()
