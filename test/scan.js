const scan = require('../index.js')

const basePath = "./dist"

const result = scan({ 
    rootDir: basePath, 
    ignoreFile: /\.txt$/, 
    ignoreDir:  /css$/,
    log: true
})

console.log(result.dirsPath)
console.log(result.filesPath)