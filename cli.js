#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear'); // clears the terminal screen
const inquirer = require('inquirer');
const figlet = require('figlet'); // creates ASCII art from text
const shell = require('shelljs');
const fs = require('fs');
const files = require('./lib/files');
const sampleServer = require('./lib/server-script');

clear();
console.log(chalk.cyanBright(figlet.textSync('CAKE', { horizontalLayout: 'full' })));

const getUserFiles = () => {
  const defaultResponse = 'oops! directory not found, please try again 🙀 🙀 🙀';
  const questions = [
    {
      name: 'static',
      type: 'input',
      message: 'Enter the name of the static folder (e.g. dist, build, public):',
      validate(value) {
        if (files.directoryExists(value)) return true;
        return defaultResponse;
      },
    },
    {
      name: 'html',
      type: 'input',
      message: 'Enter the path of the index.html:',
      validate(value) {
        if (files.indexExists(value)) return true;
        return defaultResponse;
      },
    },
    {
      name: 'component',
      type: 'input',
      message: 'Enter the root component to mount:',
      validate(value) {
        if (files.componentExists(value)) return true;
        return defaultResponse;
      },
    },
    {
      name: 'script',
      type: 'input',
      message: 'Enter a npm script name to start your SSR server (e.g. start-SSR):',
      validate(value) {
        if (files.nameValidation(value)) return true;
        return 'Cannot contain symbols or "-" as first character';
      },
    },
    {
      name: 'servername',
      type: 'input',
      message: 'Enter new name for server side file:',
      validate(value) {
        if (files.nameValidation(value)) return true;
        return 'Cannot contain symbols or "-" as first character';
      },
    },
  ];
  inquirer.prompt(questions).then((user) => {
    fs.writeFile('userInput.json', JSON.stringify(user, null, 2), (err) => {
      if (err) throw err;
    });

    fs.readFile('package.json', 'utf8', function(err, data) {
      if(err) throw err;
      // const pjFile = JSON.parse(data);
      const newPjFile = Object.assign({}, JSON.parse(data));
       newPjFile.scripts[user.script] = `babel-node ${user.servername}.js`

      fs.writeFile('package.json', JSON.stringify(newPjFile, null, 2), (err) => {
        if (err) throw err;
        console.log('package.json successfull rewritten')
      })
    });

    fs.writeFile(`${user.servername}.js`, sampleServer, (err) => {
      if (err) throw err;
      else { 
        // shell.exec('npm run start-SSR');
      }
    });
    console.log('Happy Thanksgiving');
  });
};

getUserFiles();

