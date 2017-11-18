
function reroutingHandler(url, document) {
  if (url) {
    
    res.status = 302;
    res.redirect(url);
    res.end();
    
  } else {
    res.write(document);
    res.end();
  }
}
