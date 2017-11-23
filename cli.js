#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear'); // clears the terminal screen
const inquirer = require('inquirer');
const figlet = require('figlet'); // creates ASCII art from text
const fs = require('fs');
const files = require('./lib/files');
const getServerScript = require('./lib/server-script');

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
      message: 'Enter the path of the html file containing the root div:',
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
    if ((userResponses.component).substring(0, 2) !== './') userResponses.component = `./${userResponses.component}`;
    fs.writeFile('SSRserver.js', getServerScript(userResponses), (err) => {
      if (err) throw err;
    });
  });
};

getUserFiles();

