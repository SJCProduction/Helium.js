#! /usr/bin/env node
const inquirer = require('inquirer');
const { test } = require('../lib/ques');
const testPromise = require('../lib/testPerf');
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
      //  RUN CSR FIRST, SSR Second
      //  2 objects, SSR/CSR, find diff
      //  Get Ratio percentage
      // a global bin command to show results
      status.stop();
      ui.updateBottomBar(JSON.stringify(results, null, 1));
      const resultsDisplay = {};      
      let CSR = true;
      if(!counter) {
        resultsDisplay.CSR = results;
        CSR = false;
      } else {
        resultsDisplay.SSR = results;
        CSR = true;
      };
      console.log(resultsDisplay);
    }
  } catch (error) {
    throw error;
  }
};
testPerf();

