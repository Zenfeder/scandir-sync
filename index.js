const fs = require('fs')
const colors = require('colors')

function Scan() {
  this.fileQueue = []
  this.dirQueue = []
}

Scan.prototype.readpathSync = function(path) {
  const files = fs.readdirSync(path)
  console.log(`...Scanning directory: ${path}`)

  files.forEach((file) => {
    this.handlepathSync(path + '/' + file)
  })
}

Scan.prototype.handlepathSync = function(path) {
  const stats = fs.statSync(path)
  // file handler
  if (stats.isFile()) {
    this.fileQueue.push(path)
  }
  // directory handler
  if (stats.isDirectory()) {
    this.readpathSync(path)
    this.dirQueue.push(path)
  }
}

module.exports = function(dir) {
  console.time('>  Time'.green)

  const scannor = new Scan()
  scannor.readpathSync(dir)
  scannor.dirQueue.push(dir)

  console.timeEnd('>  Time'.green)
  console.log('>  Successful!'.green)

  console.log(`>  Total ${scannor.dirQueue.length} directorys and ${scannor.fileQueue.length} files`.green)

  return {
    filesPath: scannor.fileQueue.slice(0),
    dirsPath: scannor.dirQueue.slice(0)
  }
}
