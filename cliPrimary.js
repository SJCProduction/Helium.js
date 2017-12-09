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

const getUserFiles = async () => {
  try {
    const user = await inquirer.prompt(questions);
    const userRes = Object.assign({}, user);
    if ((userRes.component).substring(0, 2) !== './') userRes.component = `./${userRes.component}`;

    if (userRes.reducer && (userRes.reducer).substring(0, 2) !== './') userRes.reducer = `./${userRes.reducer}`;

    const SSRname = `${userRes.servername}.js`;

    fs.readFile('package.json', 'utf8', (error, result) => {
      if (error) throw error;
      const newPjFile = Object.assign({}, JSON.parse(result));
      newPjFile.scripts[userRes.script] = `./node_modules/.bin/webpack && babel-node ${SSRname}`;
      fs.writeFileSync('package.json', JSON.stringify(newPjFile, null, 2));

      if (userRes.reducer) fs.writeFileSync(`${SSRname}`, getReduxServerScript(userRes));
      else fs.writeFileSync(`${SSRname}`, getServerScript(userRes));
      // console.log('And your answers are:', userRes);
      shell.exec(`npm run ${userRes.script}`);

      // function puts(error, stdout, stderr) { console.log(stdout) };
      // spawn(`npm run ${userRes.script}`, { stdio: 'inherit' })
    });
  } catch (e) {
    throw e;
  }
};
getUserFiles();

