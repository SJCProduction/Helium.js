
const express = require('express');
const path = require('path');
const fs = require('fs');
const ssr = require('./indexNPM.js');
const app = express();
const PORT = process.env.PORT || 3333;


const inputs = ssr.userData()

ssr.init({
  html: inputs.html, 
  component: inputs.component
});

app.use(express.static(inputs.static));

app.get('*', ssr.render, (request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"})
})

app.listen(3333);
