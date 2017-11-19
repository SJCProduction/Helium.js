import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import fs from 'fs';
// import getUserData from './lib/utils.js';


const app = express();
const PORT = process.env.PORT || 3333;


// Retrieving user data




  function UserData() {
  const ready =  fs.readFileSync('./userInput.json', 'utf8');
  return ready;
  };
  const parsedData = JSON.parse(UserData());

  var inputs = {
    static: parsedData.static,
    html: parsedData.html,
    component: parsedData.component
  }

console.log('INVOKE', inputs.static)




// import App from inputs.component;
import { StaticRouter } from 'react-router-dom';

// app.use(express.static(inputs.static));
console.log('STOP')
app.get('*', (req, res) => {
  const context = {};
  let stringComponent = handleRender(App, context, req);
  reroutingHandler(stringComponent, res, context.url, inputs.html);

});

function handleRender (Component, context, req){
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={ req.url } context={ context }>
      <Component />
    </StaticRouter>
  );
  return html;
}

function reroutingHandler(component, res, url, HTMLPath) {
  if (url) {
    res.status = 302;
    res.redirect(url);
    res.end();
  } else {
    fs.readFile(HTMLPath, 'utf8', function (err, data) {
      if (err) throw err;
      const document = data.replace(/<body>(.*)<\/body>/, `<body><div id="root">${component}</div>$1</body>`);
      res.write(document);
      res.end();
    });
  }
}

app.listen(PORT, () => {
  console.log(`test-ssr16 app is listening on ${PORT}`)
});
