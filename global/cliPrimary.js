#!/usr/bin/env node

/*
  Copyright (c) 2017 Shachy Rivas @shachyjr, Chris Li @cli53, Julie Moon @juliemoon
  Licensed under the MIT License http://www.opensource.org/licenses/mit-license.php
*/

const chalk = require('chalk');
const clear = require('clear'); // clears the terminal screen
const inquirer = require('inquirer');
const figlet = require('figlet'); // creates ASCII art from text
const shell = require('shelljs');
const cmd = require('node-cmd');
const fs = require('fs');
const { questions } = require('../lib/ques');
const { getServerScript, getReduxServerScript } = require('../lib/server-script');

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
      newPjFile.scripts['helium:start'] = `nodemon ${SSRname} --exec babel-node --presets es2015`;
      newPjFile.scripts['helium:build'] = `babel ${SSRname} -o ${SSRname.slice(0, -3)}.prod.js`;
      newPjFile.scripts['helium:serve'] = `node ${SSRname.slice(0, -3)}.prod.js`;
      fs.writeFileSync('package.json', JSON.stringify(newPjFile, null, 2));
      if (userRes.reducer) fs.writeFileSync(`${SSRname}`, getReduxServerScript(userRes));
      else fs.writeFileSync(`${SSRname}`, getServerScript(userRes));
      shell.exec(`npm run helium:start`);
      console.log('heeet');
      // cmd.get(`npm run start:helium`, (err, data, stderr) => {
      //   if (err) throw new Error(err);
      //   console.log(data, stderr);
      // });
    });
  } catch (e) {
    throw e;
  }
};
getUserFiles();

