#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const clear = require('clear'); // clears the terminal screen
const inquirer = require('inquirer');
const figlet = require('figlet'); // creates ASCII art from text
const fs = require('fs');
const files = require('./lib/files');

clear();
console.log(chalk.cyanBright(figlet.textSync('CAKE', { horizontalLayout: 'full' }),),);

const getUserFiles = (callback) => {
  const defaultResponse = 'oops! directory not found, please try again 🙀 🙀 🙀';
  const questions = [
    {
      name: 'static',
      type: 'input',
      message: 'Enter the name of the static folder (e.g. dist or build):',
      validate(value) {
        if (files.directoryExists(value)) {
          return true;
        } 
          return defaultResponse;
        
      },
    },
    {
      name: 'html',
      type: 'input',
      message: 'Enter the path of the index.html:',
      validate(value) {
        if (files.indexExists(value)) {
          return true;
        } 
          return defaultResponse;
        
      },
    },
    {
      name: 'component',
      type: 'input',
      message: 'Enter the root component to mount:',
      validate(value) {
        if (files.componentExists(value)) {
          return true;
        } 
          return defaultResponse;
        
      },
    },

  ];
  inquirer.prompt(questions).then((userInput) => userInput).then((user) => {
    fs.writeFile('userInput.json', JSON.stringify(user, null, 2), (err) => {
      if (err) throw err;
      console.log('file written');
    });
  });
};

getUserFiles(function () {
  console.log(arguments);
});

