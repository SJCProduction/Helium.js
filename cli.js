#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear'); // clears the terminal screen
const inquirer = require('inquirer');
const figlet = require('figlet'); // creates ASCII art from text
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
      message: 'Enter the path of your root html file:',
      validate(value) {
        if (files.indexExists(value)) return true;
        return defaultResponse;
      },
    },
    {
      name: 'component',
      type: 'input',
      message: 'Enter the path of your root component file:',
      validate(value) {
        if (files.componentExists(value)) return true;
        return defaultResponse;
      },
    },
  ];
  inquirer.prompt(questions).then((user) => {
    const userResponses = Object.assign({}, user);
    // check for ./ in front ogf component path
    if ((userResponses.component).substring(0, 2) !== './') userResponses.component = `./${userResponses.component}`;
    fs.writeFile('./node_modules/sjc/userInput.json', JSON.stringify(userResponses, null, 2), (err) => {
      if (err) throw err;
    });
    fs.writeFile('SSRserver.js', sampleServer, (err) => {
      if (err) throw err;
    });
  });
};

getUserFiles();

