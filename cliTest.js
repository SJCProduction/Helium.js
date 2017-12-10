#! /usr/bin/env node
const inquirer = require('inquirer');
const { test } = require('./lib/ques');
const shell = require('shelljs');
const testPromise = require('./lib/testPerf');
const CLI = require ('clui');
const Spinner = CLI.Spinner



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



     // let results2 = shell.exec('node ./node_modules/helium.js/lib/testPerf.js', {async:true});
      // results2.stdout.on('data', data => {
      //   console.log('THIS IS OUTSIDE TEST',data);
      // });
