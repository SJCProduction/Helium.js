const sjcReactDOMServer = require('react-dom/server');
const sjcFS = require('fs');

let inputs = {
  htmlPath: '',
  componentPath: ''
};

function init(config) {
  inputs = config;
}

const App = require(inputs.componentPath).default;
const StaticRouter = require('react-router-dom').StaticRouter;

function render(req, res, next) {
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
    sjcFS.readFile(inputs.htmlPath, 'utf8', function (err, data) {
      if (err) throw err;
      const document = data.replace(/<body>(.*)<\/body>/, `<body><div id="root">${stringComponent}</div>$1</body>`);
      res.write(document);
    });
  }
  next();
};

exports.init = init;
exports.render = render;