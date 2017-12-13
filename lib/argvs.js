/*
  Copyright (c) 2017 Shachy Rivas @shachyjr, Chris Li @cli53, Julie Moon @juliemoon
  Licensed under the MIT License http://www.opensource.org/licenses/mit-license.php
*/

const fs = require('fs');
const path = require('path');
const { argv } = require('yargs');

const renderTests = (cmd, results) => {
  const resultsDisplay = {};
  if (cmd === argv.csr) {
    resultsDisplay.csr = results;
    try {
      fs.writeFile(path.join(__dirname, '../stats', 'perfResults.json'), JSON.stringify(resultsDisplay, null, 2), (error) => {
        if (error) throw Error('unable to write CSR', error);
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  if (cmd === argv.ssr) {
    resultsDisplay.ssr = results;
    try {
      fs.readFile(path.join(__dirname, '../stats', 'perfResults.json'), 'utf8', (error, data) => {
        const statsObj = Object.assign({}, JSON.parse(data));
        statsObj.ssr = results;
        fs.writeFile(path.join(__dirname, '../stats', 'perfResults.json'), JSON.stringify(statsObj, null, 2), (err) => {
          if (err) throw new Error('unable to write CSR', error);
        });
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  if (cmd === argv.diff) {
    try {
      fs.readFile(path.join(__dirname, '../stats', 'perfResults.json'), (error, data) => {
        function calculatePercent(a, b) {
          return ((a - b) / a) * 100;
        }
        const parseStats = Object.assign({}, JSON.parse(data));
        const diff = {};
        const c = parseStats.csr.webapi;
        const s = parseStats.ssr.webapi;
        diff.DOMLoading = calculatePercent(c.DOMLoading, s.DOMLoading);
        diff.DOMContentLoaded = calculatePercent(c.DOMContentLoaded, s.DOMContentLoaded);
        diff.DOMComplete = calculatePercent(c.DOMComplete, s.DOMComplete);
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

module.exports = { renderTests };
