'use strict';
const sjcReactDOMServer = require('react-dom/server');
const fs = require('fs');

let inputs = {};

function init(config) {
  inputs.html = config.html;
  inputs.component = config.component;
  inputs.App = config.App;
}

function render(req, res, next) {
  // TODO: optimize App/Static for every call
  // const App = require(inputs.component).default;

  // TODO: temporary fix to 'Critical dependency: the request of a dependency is an expression' warning, which causes 'Cannot find module "."' error in webpack bundle
  const App = inputs.App;

  const StaticRouter = require('react-router-dom').StaticRouter;

  const context = {};
  let stringComponent = sjcReactDOMServer.renderToString(
    <StaticRouter location={ req.url } context={ context }>
      <App />
    </StaticRouter>
  );
  if (context.url) {
    res.status = 302;
    res.redirect(context.url);
  } else {
    fs.readFile(inputs.html, 'utf8', function (err, data) {
      if (err) throw err;
      const document = data.replace(/<body>(.*)<\/body>/, `<body><div id="root">${stringComponent}</div>$1</body>`);
      res.write(document);
      res.end();
    });
  }
};

function userData() {
  const ready = fs.readFileSync('./userInput.json', 'utf8');
  return JSON.parse(ready);
};

exports.init = init;
exports.render = render;
exports.userData = userData;