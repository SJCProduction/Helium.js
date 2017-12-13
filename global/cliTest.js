#! /usr/bin/env node

/*
  Copyright (c) 2017 Shachy Rivas @shachyjr, Chris Li @cli53, Julie Moon @juliemoon
  Licensed under the MIT License http://www.opensource.org/licenses/mit-license.php
*/

const inquirer = require('inquirer');
const { test } = require('../lib/ques');
const { testPromise } = require('../lib/testPerf');
const { renderTests } = require('../lib/argvs.js');
const { argv } = require('yargs');
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

