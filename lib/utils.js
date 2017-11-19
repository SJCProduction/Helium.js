const fs = require('fs');

async function getUserData () {
 let ready = await fs.readFile('../userInput.json', 'utf8', (err, data) => {
  let parsedData = JSON.parse(data)
  console.log(parsedData)
  })
}

// export default function getUserData () {
//   let ready = fs.readFile('../userInput.json', 'utf8', (err, data) => {
//    let parsedData = JSON.parse(data)
//    console.log(parsedData)
//    })
//  }

module.exports = getUserData;