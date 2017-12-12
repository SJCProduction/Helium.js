const puppeteer = require('puppeteer');


async function test() {
  const performance = {};
  const browser = await puppeteer.launch({ headless: false, timeout: 7000 });
  const page = await browser.newPage();
  await page.goto('http://localhost:3333/');
  const perf = await page.evaluate(() => {
    const t = performance.timing;
    return Object.assign({
      // When the parser started its work, that is when its Document.readyState changes to 'loading' and the corresponding readystatechange event is thrown.
      // firstPaint: chrome.loadTimes().firstPaintTime * 1000 - performance.timing.navigationStart,
      DOMLoading: `${t.domLoading - t.navigationStart}ms`,
      DOMContentLoaded: `${t.domContentLoadedEventStart - t.domLoading}ms`,
      DOMComplete: `${t.domComplete - t.domLoading}ms`,
    }, window.performance.timing);
  });
  performance.webapi = perf;
  return performance;
}
module.exports = test;


