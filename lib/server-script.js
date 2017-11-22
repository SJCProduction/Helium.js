const sampleServer = 
`
const express = require('express');
const ssr = require('sjc');
const app = express();
const PORT = process.env.PORT || 3333;


const inputs = ssr.userData()
// importing App for temporary fix to expression dependency error
const App = require(inputs.component).default

ssr.init({
  html: inputs.html, 
  component: inputs.component,
  // sending App on init for temporary fix to expression dependency error
  App: App
});

app.use(express.static(inputs.static));

app.get('*', ssr.render)

app.listen(3333);
`

module.exports = sampleServer;