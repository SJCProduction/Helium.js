#! /usr/bin/env node
const inquirer = require('inquirer');
const { test } = require('../lib/ques');
const testPromise = require('../lib/testPerf');
const { argv } = require('yargs');
const fs = require('fs');
const path = require('path');
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
      let resultsDisplay = {};
      if (argv.CSR) {
        resultsDisplay.CSR = results;
        fs.writeFile(path.join(__dirname, '../stats', 'perfResults.json'), JSON.stringify(resultsDisplay, null, 2), (error) => {
        console.log(error);
        });
      };

      if (argv.SSR) {
        resultsDisplay.SSR = results;
        fs.readFile(path.join(__dirname, '../stats', 'perfResults.json'), 'utf8', (error, data) => {
          const statsObj = Object.assign({}, JSON.parse(data));
          statsObj.SSR = results;
          fs.writeFile(path.join(__dirname, '../stats', 'perfResults.json'), JSON.stringify(statsObj, null, 2), (error) => {
            console.log(error);
          });
        });
      }

      if (argv.diff) {
        fs.readFile(path.join(__dirname, '../stats', 'perfResults.json'), (error, data) => {
          const parseStats = JSON.parse(data);
          const diff = {};
          diff.DOMLoading = ((parseStats.CSR.webapi.DOMLoading - parseStats.SSR.webapi.DOMLoading) / parseStats.CSR.webapi.DOMLoading) * 100;
          diff.DOMContentLoaded = ((parseStats.CSR.webapi.DOMContentLoaded - parseStats.SSR.webapi.DOMContentLoaded) / parseStats.CSR.webapi.DOMContentLoaded) * 100;
          diff.DOMComplete = ((parseStats.CSR.webapi.DOMComplete - parseStats.SSR.webapi.DOMComplete) / parseStats.CSR.webapi.DOMComplete) * 100;
          console.log(diff);
        });
      }


      // let CSR = true;
      // if(CSR) {
      //   resultsDisplay.CSR = results;
      //   CSR = false;
      // } else {
      //   resultsDisplay.SSR = results;
      // let diff = resultsDisplay.CSR - resultsDisplay.SSRR;
      //   let percent = (diff / resultsDisplay.CSR) * 100;
      //   console.log(`This is the percent:, ${percent}%`)
      //   CSR = true;
      // };
      console.log(resultsDisplay);
    }
  } catch (error) {
    throw error;
  }
};
testPerf();

