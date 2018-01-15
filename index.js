const fs = require('fs')
const colors = require('colors')
const log = require('single-line-log').stdout

function Scan({ ignoreFile, ignoreDir, log }) {
  this.fileQueue = []
  this.dirQueue = []

  this.ignoreFile = ignoreFile || null
  this.ignoreDir = ignoreDir || null
  this.log = typeof log === 'boolean'?log:true
}

Scan.prototype.readpathSync = function(path) {
  const files = fs.readdirSync(path)
  if (this.log) {
    log(`> Scanning directory: ${path}\n`.grey)
  }

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

module.exports = function({ rootDir, ignoreFile, ignoreDir, log }) {
  console.time(`> Scan directory ${rootDir} successful`.green)
  
  const scannor = new Scan({ ignoreFile, ignoreDir, log })
  scannor.readpathSync(rootDir)
  scannor.dirQueue.push(rootDir)

  console.timeEnd(`> Scan directory ${rootDir} successful`.green)

  if (scannor.log) {
    console.log(`> Total ${scannor.dirQueue.length} directorys and ${scannor.fileQueue.length} files`.green)
  }

  return {
    filesPath: scannor.fileQueue.slice(0),
    dirsPath: scannor.dirQueue.slice(0)
  }
}
