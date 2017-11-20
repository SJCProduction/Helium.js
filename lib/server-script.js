const sampleServer = 
`
const express = require('express');
const path = require('path');
const fs = require('fs');
const srr = require('./index.js');

const app = express();
const PORT = process.env.PORT || 3333;

const inputs = srr.userData()
ssr.init({
  html: inputs.html, 
  component: inputs.component
});

app.use(express.static(inputs.static));

app.get('*', ssr.render(req, res, next), (req, res) => {

  res.end();
});

app.listen(3333);
`

exports.sampleServer = sampleServer;