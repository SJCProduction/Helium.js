#! /usr/bin/env node
const inquirer = require('inquirer');
const { test } = require('../lib/ques');
const testPromise = require('../lib/testPerf');
const fs = require('fs');
const CLI = require('clui');

const { Spinner } = CLI;

const resultsDisplay = {};

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
      let CSR = true;
      if(CSR) {
        resultsDisplay.CSR = results;
        fs.appendFile
        CSR = false;
      } else {
        resultsDisplay.SSR = results;
        let diff = resultsDisplay.CSR - resultsDisplay.SSRR;
        let percent = (diff / resultsDisplay.CSR) * 100;
        console.log(`This is the percent:, ${percent}%`)
        CSR = true;
      };
      console.log(resultsDisplay);
    }
  } catch (error) {
    throw error;
  }
};
testPerf();

