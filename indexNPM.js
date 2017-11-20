const sjcReactDOMServer = require('react-dom/server');
const sjcFS = require('fs');


let inputs = {
  html: '',
  component: ''
};

function init(config) {
  inputs = config;
}

console.log('INSIDE OF INDEXNPM', inputs)

const App = require(inputs.component).default;

const StaticRouter = require('react-router-dom').StaticRouter;

function render(req, res, next) {
//optimize App/Static for every call


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
    sjcFS.readFile(inputs.html, 'utf8', function (err, data) {
      if (err) throw err;
      const document = data.replace(/<body>(.*)<\/body>/, `<body><div id="root">${stringComponent}</div>$1</body>`);
      res.write(document);
    });
  }
  next();
};

function userData() {
  const ready = sjcFS.readFileSync('./userInput.json', 'utf8');
  return JSON.parse(ready);
};

exports.init = init;
exports.render = render;
exports.userData = userData;