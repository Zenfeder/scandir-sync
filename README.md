# scandir-sync

## Install
npm install scandir-sync

## Usage
```javascript
    const scan = require('scandir-sync')
    const basePath = "./dist"

    const result = scan(basePath)
    
    // get a array of all the scanned directorys path
    console.log(result.dirsPath)

    // get a array of all the scanned files path
    console.log(result.filesPath)
```

