const puppeteer = require('puppeteer');

const hostPath = value => value;

async function test() {
  const performance = {};
  const browser = await puppeteer.launch({ headless: false, timeout: 7000 });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${hostPath}/`);
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
  test,
  hostPath,
};
