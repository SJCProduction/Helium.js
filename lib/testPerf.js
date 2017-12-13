/*
  Copyright (c) 2017 Shachy Rivas @shachyjr, Chris Li @cli53, Julie Moon @juliemoon
  Licensed under the MIT License http://www.opensource.org/licenses/mit-license.php
*/

const puppeteer = require('puppeteer');

let num;
const hostPath = (value) => {
  num = value;
  return true;
};

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
module.exports = {
  testPromise,
  hostPath,
};
