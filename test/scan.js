const scan = require('../index.js')

const basePath = "./dist"

const result = scan(basePath)

console.log(result.dirsPath)
console.log(result.filesPath)