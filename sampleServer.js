const express = require('express');
const path = require('path');
const fs = require('fs');

const ssr = require('ssr-test-sjr');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static('./public'));

ssr.init({
  html: './index.html',
  component: './src/components/App.js'
});

app.get('*', ssr.render(req, res, next), (req, res) => {

  // do other stuff with resp
  res.end();
});

app.listen(PORT, () => {
  console.log(`test-ssr16 app is listening on ${PORT}`)
});
