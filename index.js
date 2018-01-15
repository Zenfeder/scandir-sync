const fs = require('fs')
const colors = require('colors')

function Scan({ ignoreFile, ignoreDir }) {
  this.ignoreFile = ignoreFile || null
  this.ignoreDir = ignoreDir || null
  this.fileQueue = []
  this.dirQueue = []
}

Scan.prototype.readpathSync = function(path) {
  const files = fs.readdirSync(path)
  console.log(`...Scanning directory: ${path}`)

  files.forEach((file) => {
    this.handlepathSync(path + '/' + file, file)
  })
}

Scan.prototype.handlepathSync = function(path, file) {
  const stats = fs.statSync(path)
  // file handler
  if (stats.isFile()) {
    if (!this.ignoreFile || (this.ignoreFile && !this.ignoreFile.test(file))) {
      this.fileQueue.push(path)
    }
  }
  // directory handler
  if (stats.isDirectory()) {
    if (!this.ignoreDir || (this.ignoreDir && !this.ignoreDir.test(file))) {
      this.readpathSync(path)
      this.dirQueue.push(path)
    }
  }
}

module.exports = function({ rootDir, ignoreFile, ignoreDir }) {
  console.time('>  Time'.green)

  const scannor = new Scan({ ignoreFile, ignoreDir })
  scannor.readpathSync(rootDir)
  scannor.dirQueue.push(rootDir)

  console.timeEnd('>  Time'.green)
  console.log('>  Successful!'.green)

  console.log(`>  Total ${scannor.dirQueue.length} directorys and ${scannor.fileQueue.length} files`.green)

  return {
    filesPath: scannor.fileQueue.slice(0),
    dirsPath: scannor.dirQueue.slice(0)
  }
}
