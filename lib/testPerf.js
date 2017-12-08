const puppeteer = require('puppeteer');


const test = async () => {
  
  const performance = {};
  const browser = await puppeteer.launch({headless: false, });
  const page = await browser.newPage();
  await page.goto('https://www.eucerinus.com/');
  const perf = await page.evaluate(() => {
    return Object.assign({
      firstPaint: chrome.loadTimes().firstPaintTime * 1000 - performance.timing.navigationStart,
      chrome: chrome.loadTimes(),
      finishLoad: chrome.loadTimes().finishLoadTime * 1000 - performance.timing.navigationStart,
      domInteractive: performance.timing.domInteractive * 1000 - performance.timing.navigationStart,

      domComplete: performance.timing.domComplete,
      loadEventEnd: performance.timing.loadEventEnd,
    }, window.performance.timing); 
  });
  //Conversion for UNIX 
  //Store data in a file to use in data visualizer
  // script for to run this file after the SSR file is written
  await page._client.send('Performance.enable');
  const response = await page._client.send('Performance.getMetrics'); // Retrieve run-time execution metric
  // console.log(response)
  performance["chromeLoadTimes"] = perf;
  performance["PerformanceGetMetrics"] = response;
  // console.log('GET INSIDE TEST >>>>>', performance["PerformanceGetMetrics"])
  // console.log('GET CHROMELOADTIMES >>>>>', perf)
 return performance;
  };
test().then(results => {
  console.log(results);
  console.log('OUTSIDE OF TEST >>>>>>>',results.PerformanceGetMetrics.metrics[0])
  // console.log('LIES =>>>',hi.PerformanceGetMetrics.metrics)
});


