const fs = require('fs');
const path = require('path');
const { argv } = require('yargs');

const renderTests = (cmd, results) => {
  const resultsDisplay = {};
  if (cmd === argv.csr) {
    resultsDisplay.CSR = results;
    try {
      fs.writeFile(path.join(__dirname, '../stats', 'perfResults.json'), JSON.stringify(resultsDisplay, null, 2), (error) => {
        if (error) throw Error('unable to write CSR', error);
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  if (cmd === argv.ssr) {
    resultsDisplay.SSR = results;
    try {
      fs.readFile(path.join(__dirname, '../stats', 'perfResults.json'), 'utf8', (error, data) => {
        const statsObj = Object.assign({}, JSON.parse(data));
        statsObj.SSR = results;
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
        const csr = parseStats.csr.webapi;
        const ssr = parseStats.ssr.webapi;
        diff.DOMLoading = calculatePercent(csr.DOMLoading, ssr.DOMLoading);
        diff.DOMContentLoaded = calculatePercent(csr.DOMContentLoaded, ssr.DOMContentLoaded);
        diff.DOMComplete = calculatePercent(csr.DOMComplete, ssr.DOMComplete);
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

module.exports = { renderTests };
