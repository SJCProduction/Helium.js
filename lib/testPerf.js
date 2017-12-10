const puppeteer = require('puppeteer');
const fs = require('fs');


async function test() {
  let chrome;
  const performance = {};
  const browser = await puppeteer.launch({ headless: false, timeout: 0});
  const page = await browser.newPage();
  await page.goto('https://www.example.com/');
  const perf = await page.evaluate(() => Object.assign({
    chrome: chrome.loadTimes(),
    firstPaint: chrome.loadTimes().firstPaintTime * 1000 - performance.timing.navigationStart,
    finishLoad: (chrome.loadTimes().finishLoadTime * 1000) -
    (chrome.loadTimes().startLoadTime * 1000),
    loadEventEnd: performance.timing.loadEventEnd - performance.timing.navigationStart,
  }, window.performance.timing));
  // Conversion for UNIX
  // Store data in a file to use in data visualizer
  // script for to run this file after the SSR file is written
  await page._client.send('Performance.enable');
  const response = await page._client.send('Performance.getMetrics'); // Retrieve run-time execution metric
  performance.chromeLoadTimes = perf;
  performance.PerformanceGetMetrics = response.metrics;
  // console.log(performance)
  return performance;
};

module.exports = test;
