#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear'); // clears the terminal screen
const inquirer = require('inquirer');
const figlet = require('figlet'); // creates ASCII art from text
const shell = require('shelljs');
const fs = require('fs');
const { questions } = require('./lib/ques');
const { getServerScript, getReduxServerScript } = require('./lib/server-script');

clear();
console.log(chalk.cyanBright(figlet.textSync('Helium', { horizontalLayout: 'full' })));

const getUserFiles = () => {
  inquirer.prompt(questions).then((user) => {
    const userRes = Object.assign({}, user);
    // const userRes = { ...user };
    if ((userRes.component).substring(0, 2) !== './') userRes.component = `./${userRes.component}`;

    const SSRname = `${userRes.servername}.js`;

    fs.readFile('package.json', 'utf8', (error, result) => {
      if (error) throw error;
      const newPjFile = Object.assign({}, JSON.parse(result));
      // const newPjFile = { ...JSON.parse(result) };
      newPjFile.scripts[userRes.script] = `babel-node ${SSRname}`;
      fs.writeFileSync('package.json', JSON.stringify(newPjFile, null, 2), (err) => {
        if (err) throw err;
      });
      if (userRes.reducer) {
        fs.writeFileSync(`${SSRname}`, getReduxServerScript(userRes), (err) => {
          if (err) throw err;
        });
      } else {
        fs.writeFileSync(`${SSRname}`, getServerScript(userRes), (err) => {
          if (err) throw err;
        });
      }
      // const ui = new inquirer.ui.BottomBar();
      // ui.log.write('Serving Side Server running on localhost: 3333');
      console.log("And your answers are:", userRes);
      shell.exec(`npm run ${userRes.script}`);
    });
  });
};

getUserFiles();

