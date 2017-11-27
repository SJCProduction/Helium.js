const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const fs = require('fs');

const inputs = {};

const init = (config) => {
  inputs.html = config.html;
  inputs.component = config.component;
  inputs.App = config.App;
};

const render = (req, res) => {
  // TODO: optimize App/Static for every call
  // const App = require(inputs.component).default; //requires is undefined 

  // TODO: temporary fix to 'Critical dependency: the request of a dependency is an expression' warning, which causes 'Cannot find module "."' error in webpack bundle
  const { App } = inputs

  const context = {};
  const stringComponent = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  if (context.url) {
    res.status = 302;
    res.redirect(context.url);
  } else {
    fs.readFile(inputs.html, 'utf8', (err, data) => {
      if (err) throw err;
      const document = data.replace(/<body>(.*)<\/body>/, `<body><div id="root">${stringComponent}</div>$1</body>`);
      res.write(document);
      res.end();
    });
  }
};

module.exports = {
  init,
  render,
};
