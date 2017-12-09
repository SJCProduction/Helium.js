#! /usr/bin/env node
const inquirer = require('inquirer');
const { test } = require('./lib/ques');
const shell = require('shelljs');

const testPerf = async () => {
  try {
    const user = await inquirer.prompt(test);
    if (user) shell.exec('node ./node_modules/helium.js/lib/testPerf.js');
  } catch (error) {
    throw error;
  }
};

testPerf();
