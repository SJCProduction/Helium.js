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
const fs = require('fs');
const { questions } = require('../lib/ques');
const { getServerScript, getReduxServerScript } = require('../lib/serverScript');
const { getPackScript } = require('../lib/packScript');

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
      newPjFile.scripts['helium:start'] = `nodemon ${SSRname} --exec babel-node --presets env`;
      newPjFile.scripts['helium:build'] = 'webpack --config ./prod/helium.webpack.config.js';
      newPjFile.scripts['helium:serve'] = `node ./prod/${SSRname.slice(0, -3)}.prod.js`;
      fs.writeFileSync('package.json', JSON.stringify(newPjFile, null, 2));
      if (userRes.reducer) fs.writeFileSync(`${SSRname}`, getReduxServerScript(userRes));
      else {
        fs.writeFile(`${SSRname}`, getServerScript(userRes), (err) => {
          if (err) throw new Error(err);
          shell.exec('npm run helium:start');
        });
      }
      if (!fs.existsSync('./prod')) fs.mkdirSync('./prod');
      fs.writeFile('prod/helium.webpack.config.js', getPackScript(SSRname, `${SSRname.slice(0, -3)}.prod.js`), (err) => {
        if (err) throw new Error(err);
      });
    });
  } catch (e) {
    throw new Error(e);
  }
};
getUserFiles();

