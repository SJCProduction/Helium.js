const cmd = require('node-cmd');



#! /usr/bin/env node

/*
  Copyright (c) 2017 Shachy Rivas @shachyjr, Chris Li @cli53, Julie Moon @juliemoon
  Licensed under the MIT License http://www.opensource.org/licenses/mit-license.php
*/

const inquirer = require('inquirer');
const { test } = require('../lib/ques');
const { renderTests } = require('../lib/argvs.js');
const { argv } = require('yargs');
const CLI = require('clui');

const { Spinner } = CLI;

async function testPromise() {
  const performance = {};
  const browser = await puppeteer.launch({ headless: false, timeout: 7000 });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${num}/`);
  const perf = await page.evaluate(() => {
    const t = performance.timing;
    return Object.assign({
      DOMLoading: t.domLoading - t.navigationStart,
      DOMContentLoaded: t.domContentLoadedEventStart - t.domLoading,
      DOMComplete: t.domComplete - t.domLoading,
    }, window.performance.timing);
  });
  performance.webapi = perf;
  return performance;
}

const testPerf = async () => {
  try {
    const user = await inquirer.prompt(test);
    if (user) {
      const ui = new inquirer.ui.BottomBar();
      const status = new Spinner('Retrieving Performance data...');
      status.start();

      localhost
      // find local hosts
      cmd.get()



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

