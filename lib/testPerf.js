const puppeteer = require('puppeteer');

// const devtools = new WebSocket('ws://localhost:3333/devtools/page/69990451-aaab-4ef8-87b1-ea77b8101b2a');

const test = async () => {
  const performance = {};
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.goto('https://www.eucerinus.com/');
  const perf = await page.evaluate(() => Object.assign({
    firstPaint: (chrome.loadTimes().firstPaintTime * 1000) - performance.timing.navigationStart,
    finishLoad: (chrome.loadTimes().finishLoadTime * 1000) - (chrome.loadTimes().startLoadTime * 1000),
    loadEventEnd: performance.timing.loadEventEnd - performance.timing.navigationStart,
  }, window.performance.timing));
  // Conversion for UNIX
  // Store data in a file to use in data visualizer
  // script for to run this file after the SSR file is written
  await page._client.send('Performance.enable');
  const response = await page._client.send('Performance.getMetrics'); // Retrieve run-time execution metric
  performance.chromeLoadTimes = perf;
  performance.PerformanceGetMetrics = response;
  return performance;
};
test().then(results => results);


// devtools.onmessage = ({ data }) => {
//   const { result: { result: { value } } } = JSON.parse(data);
//   console.log('WebSocket Message Received: ', value);
// };

// devtools.send(JSON.stringify({
//   id: 1,
//   method: 'Runtime.evaluate',
//   params: {
//     expression: '\'The current URL is: \' + location.href',
//   },
// }));

// module.exports = {
//   test,
// };
