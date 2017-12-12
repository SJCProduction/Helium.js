const fs = require('fs');
const path = require('path');
const { argv } = require('yargs');

const renderTests = (cmd, results) => {
  const resultsDisplay = {};
  if (cmd === argv.CSR) {
    resultsDisplay.CSR = results;
    try {
      fs.writeFile(path.join(__dirname, '../stats', 'perfResults.json'), JSON.stringify(resultsDisplay, null, 2), (error) => {
        if (error) throw Error('unable to write CSR', error);
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  if (cmd === argv.SSR) {
    resultsDisplay.SSR = results;
    try {
      fs.readFile(path.join(__dirname, '../stats', 'perfResults.json'), 'utf8', (error, data) => {
        const statsObj = Object.assign({}, JSON.parse(data));
        statsObj.SSR = results;
        fs.writeFile(path.join(__dirname, '../stats', 'perfResults.json'), JSON.stringify(statsObj, null, 2), (err) => {
          if (err) throw Error('unable to write CSR', error);
        // console.log(err);
        });
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  if (cmd === argv.diff) {
    try {
      fs.readFile(path.join(__dirname, '../stats', 'perfResults.json'), (error, data) => {
        const parseStats = Object.assign({}, JSON.parse(data));
        const diff = {};
        const CSR = parseStats.CSR.webapi;
        const SSR = parseStats.SSR.webapi;
        diff.DOMLoading = ((CSR.DOMLoading - SSR.DOMLoading) / CSR.DOMLoading) * 100;
        diff.DOMContentLoaded = ((CSR.DOMContentLoaded - SSR.DOMContentLoaded) / CSR.DOMContentLoaded) * 100;
        diff.DOMComplete = ((CSR.DOMComplete - SSR.DOMComplete) / CSR.DOMComplete) * 100;
        console.log(diff);
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

module.exports = { renderTests };
