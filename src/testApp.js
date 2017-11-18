const fs = require('fs');

export default async function getUserData () {
 let ready = await fs.readFile('../userInput.json', 'utf8', (err, data) => {
  let parsedData = JSON.parse(data)
  console.log(parsedData)
  })
}
getUserData()

