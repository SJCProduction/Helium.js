#! /usr/bin/env node
const inquirer = require('inquirer');
const { test } = require('./lib/ques');
const shell = require('shelljs');
const testPromise = require('./lib/testPerf');
const CLI = require ('clui');
const Spinner = CLI.Spinner

//work on dynamic importing
const testPerf = async () => {
  try {
    const user = await inquirer.prompt(test);
    if (user) {
      const ui = new inquirer.ui.BottomBar();
      // let results = await testPromise()
      const status = new Spinner('Retrieving Performance data...');
      status.start();
      
      const data = testPromise().then(results => {
        status.stop();
        ui.updateBottomBar(JSON.stringify(results.PerformanceGetMetrics, null, 2));
      })
    }
  } catch (error) {
    throw error;
  }
};
testPerf();

