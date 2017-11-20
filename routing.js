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

module.exports = reroutingHandler;