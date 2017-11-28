#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear'); // clears the terminal screen
const inquirer = require('inquirer');
const figlet = require('figlet'); // creates ASCII art from text
const shell = require('shelljs');
const fs = require('fs');
const { questions } = require('./lib/ques');
const getServerScript = require('./lib/server-script');

clear();
console.log(chalk.cyanBright(figlet.textSync('CAKE', { horizontalLayout: 'full' })));

const getUserFiles = () => {
  inquirer.prompt(questions).then((user) => {
    const userRes = Object.assign({}, user);
    if ((userRes.component).substring(0, 2) !== './') userRes.component = `./${userRes.component}`;

    const SSRname = `${userRes.servername}.js`;

    //Update Package.json
    fs.readFile('package.json', 'utf8', (err, result) => {
      if (err) throw err;
      const newPjFile = Object.assign({}, JSON.parse(result));
      newPjFile.scripts[userRes.script] = `babel-node ${SSRname}`;

      fs.writeFileSync('package.json', JSON.stringify(newPjFile, null, 2), (err) => {
        if (err) throw err;
      });

      fs.writeFileSync(`${SSRname}`, getServerScript(userRes), (err) => {
        if (err) throw err;
      });
      shell.exec(`npm run ${userRes.script}`);
    });
  });
};

getUserFiles();

