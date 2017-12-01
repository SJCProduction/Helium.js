const {
  React,
  ReactDOMServer,
  StaticRouter,
  Provider,
  createStore,
  id,
} = require('./global.js');
let { preloadedState } = require('./global.js');
const fs = require('fs');
const config = {};
const init = (inputs) => {
  console.log('inside init >>>>>>>>>>>>>>>');
  config.html = inputs.html;
  config.App = inputs.App;
  config.reducer = inputs.reducer;
};

const serve = (req, res) => {
  console.log('inside render >>>>>>>>>>>>>>>');
  const { App, reducer } = config;
  console.log("inside serve>>>>>", reducer);
  const context = {};
  const serveStore = createStore(reducer);
  preloadedState = serveStore.getState();

  const stringComponent = ReactDOMServer.renderToString(
    <Provider store={serveStore}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  if (context.url) {
    res.status = 302;
    res.redirect(context.url);
  } else {
    fs.readFile(config.html, 'utf8', (err, data) => {
      if (err) throw err;
      const regEx = new RegExp(`<div id="${id}"><\/div>`, 'gi');
      const document = data.replace(regEx, `<div id="${id}">${stringComponent}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`);
      res.write(document);
      res.end();
    });
  }
};

module.exports = {
  config,
  init,
  serve,
};
