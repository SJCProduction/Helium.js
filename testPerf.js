const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false, });
  const page = await browser.newPage();
  await page.goto('https://nytimes.com');
  const perf = await page.evaluate(() => {
    return Object.assign({
      firstPaint: chrome.loadTimes().firstPaintTime * 1000 - performance.timing.navigationStart,
      chrome: chrome.loadTimes(),
      finishLoad: chrome.loadTimes().finishLoadTime * 1000 - performance.timing.navigationStart,
      x: performance.timing.domInteractive,
      z: performance.timing.domComplete,
      y: performance.timing.loadEventEnd,
    }, window.performance.timing); 
  });
  //Conversion for UNIX 
  await page._client.send('Performance.enable');
  const response = await page._client.send('Performance.getMetrics');
  console.log(perf);
  // console.log(response)
})();

