const puppeteer = require('puppeteer');


function findDCL(metric) {
  return metric.name === 'DomContentLoaded';
}

async function test() {
  let chrome;
  const performance = {};
  const browser = await puppeteer.launch({ headless: true, timeout: 7000});
  const page = await browser.newPage();
  await page.goto('http://localhost:3333/');
  const perf = await page.evaluate(() => {
    const t = performance.timing;
    return Object.assign({
      // chrome: chrome.loadTimes(),
      // firstPaint: (chrome.loadTimes().firstPaintTime * 1000) - performance.timing.navigationStart,
      // loadEventEnd: performance.timing.loadEventEnd - performance.timing.navigationStart,
      interactiveN: `${t.domInteractive - t.navigationStart}ms`,
      dclN: `${t.domContentLoadedEventStart - t.navigationStart}ms`,
      completeN: `${t.domComplete - t.navigationStart}ms`,
      interactiveD: `${t.domInteractive - t.domLoading}ms`,
      dclD: `${t.domContentLoadedEventStart - t.domLoading}ms`,
      completeD: `${t.domComplete - t.domLoading}ms`,
    }, {});
  });
  // const pageClient = page._client;
  // await pageClient.send('Performance.enable');
  // const response = await pageClient.send('Performance.getMetrics'); // Retrieve run-time execution metric
  performance.chromeLoadTimes = perf;
  // performance.DomContentLoaded = response.metrics.find(findDCL);
  // performance.PerformanceGetMetrics = response.metrics;
  // console.log(performance);
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


// DevTools is currently not well-suited for CRP measurements because it does not have a built-in mechanism for isolating critical resources. Run a Lighthouse audit to help identify such resources.

