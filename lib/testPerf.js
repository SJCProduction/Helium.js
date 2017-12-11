const puppeteer = require('puppeteer');

async function test() {
  const performance = {};
  const browser = await puppeteer.launch({ headless: true, timeout: 7000 });
  const page = await browser.newPage();
  await page.goto('http://localhost:3333/');
  const perf = await page.evaluate(() => {
    const t = window.performance.timing;
    return Object.assign({
      // When the parser started its work, that is when its Document.readyState changes to 'loading' and the corresponding readystatechange event is thrown.
      DOMLoading: `${t.domLoading}`,
      interactiveDom: `${t.domInteractive - t.domLoading}ms`,
      DOMContentLoadedclD: `${t.domContentLoadedEventStart - t.domLoading}ms`,
      DOMComplete: `${t.domComplete - t.domLoading}ms`,
    }, {});
  });
  const pageClient = page._client;
  await pageClient.send('Performance.enable');
  const response = await pageClient.send('Performance.getMetrics'); // Retrieve run-time execution metric
  performance.webapi = perf;
  performance.chrome = response.metrics;
  return performance;
}


module.exports = test;


// function measureCRP() {
//   var t = window.performance.timing,
//     interactive = t.domInteractive - t.domLoading,
//     dcl = t.domContentLoadedEventStart - t.domLoading,
//     complete = t.domComplete - t.domLoading;
//   var stats = document.createElement('p');
//   stats.textContent = 'interactive: ' + interactive + 'ms, ' +
//       'dcl: ' + dcl + 'ms, complete: ' + complete + 'ms';
//   document.body.appendChild(stats);
// }

