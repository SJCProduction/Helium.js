#! /usr/bin/env node
const inquirer = require('inquirer');
const { test } = require('../lib/ques');
const testPromise = require('../lib/testPerf');
const { renderTests } = require('../lib/argvs.js');
const { argv } = require('yargs');
// const fs = require('fs');
// const path = require('path');
const CLI = require('clui');

const { Spinner } = CLI;

const testPerf = async () => {
  try {
    const user = await inquirer.prompt(test);
    if (user) {
      const ui = new inquirer.ui.BottomBar();
      const status = new Spinner('Retrieving Performance data...');
      status.start();
      const results = await testPromise();
      status.stop();
      ui.updateBottomBar(JSON.stringify(results, null, 1));
      const userSelection = argv.csr || argv.ssr || argv.diff;
      renderTests(userSelection, results);
    }
  } catch (error) {
    throw error;
  }
};
testPerf();

