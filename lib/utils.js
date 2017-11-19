const fs = require('fs');


async function getUserData() {
 let ready = await fs.readFile('../userInput.json', 'utf8', (err, data) => {
  let parsedData = data
  console.log(parsedData)
  if(!parsedData) return parsedData
    })
  }


// async function getUserData () {
//   let ready = await fs.readFile('../userInput.json', 'utf8')
//    let parsedData = await JSON.parse(ready)
//    return parsedData
//  }


 module.exports = getUserData