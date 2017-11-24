#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear'); // clears the terminal screen
const inquirer = require('inquirer');
const figlet = require('figlet'); // creates ASCII art from text
const shell = require('shelljs');
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
    const userRes = Object.assign({}, user);
    if ((userRes.component).substring(0, 2) !== './') userRes.component = `./${userRes.component}`;
    const SSRname = `${userRes.servername}.js` 

    //Update Package.json
    fs.readFile('package.json', 'utf8', function(err, result) {
      if(err) throw err;
      const newPjFile = Object.assign({}, JSON.parse(result));
       newPjFile.scripts[userRes.script] = `babel-node ${SSRname}`

      fs.writeFile('package.json', JSON.stringify(newPjFile, null, 2), (err) => {
        if (err) throw err;
        console.log('package.json successfull rewritten')
      })
    });

    fs.writeFile(`${SSRname}`, getServerScript(userRes), (err) => {
      if (err) throw err;
      else { 
        shell.exec(`npm run ${SSRname}`);
      }
    });
    console.log('Happy Thanksgiving');
  });
};

getUserFiles();

