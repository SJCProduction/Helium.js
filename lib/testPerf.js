const puppeteer = require('puppeteer');

async function test() {
  let chrome;
  const performance = {};
  const browser = await puppeteer.launch({ headless: false, timeout: 0 });
  const page = await browser.newPage();
  await page.goto('http://localhost:3333/');
  const perf = await page.evaluate(() => Object.assign({
    chrome: chrome.loadTimes(),
    firstPaint: (chrome.loadTimes().firstPaintTime * 1000) - performance.timing.navigationStart,
    finishLoad: (chrome.loadTimes().finishLoadTime * 1000) -
    (chrome.loadTimes().startLoadTime * 1000),
    loadEventEnd: performance.timing.loadEventEnd - performance.timing.navigationStart,
  }, window.performance.timing));
  const pageClient = page._client;
  await pageClient.send('Performance.enable');
  const response = await pageClient.send('Performance.getMetrics'); // Retrieve run-time execution metric
  performance.chromeLoadTimes = perf;
  performance.PerformanceGetMetrics = response.metrics;
  return performance;
};

module.exports = test;
