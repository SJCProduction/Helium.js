
const express = require('express');
const path = require('path');
const fs = require('fs');
console.log('before inside index')
const srr = require('./indexNPM.js');

const app = express();
const PORT = process.env.PORT || 3333;

console.log('before after index')
const inputs = srr.userData()
ssr.init({
  html: inputs.html, 
  component: inputs.component
});

app.use(express.static(inputs.static));

app.get('*', ssr.render, (req, res) => {

  res.end();
});

app.listen(3333);
