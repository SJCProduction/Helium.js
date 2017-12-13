/*
  Copyright (c) 2017 Shachy Rivas @shachyjr, Chris Li @cli53, Julie Moon @juliemoon
  Licensed under the MIT License http://www.opensource.org/licenses/mit-license.php
*/

const fs = require('fs');
const path = require('path');
// we’ll want the name of the directory we’re working in, not the directory where our application resides. Making our console application work globally
// cwd returns current working directory
// __dirname returns the directory name of the directory containing the JS source code
const getCurrentDirectoryBase = () => path.basename(process.cwd());

const directoryExists = filePath => fs.existsSync(filePath);

const indexExists = filePath => fs.existsSync(filePath) && filePath.match(/\.html/);

const idExists = (id, user) => {
  const data = fs.readFileSync(user.html, 'utf8');
  const regex = new RegExp(`<div(.*?)id="${id}"(.*?)>`);
  return data.match(regex);
};

const componentExists = filePath => fs.existsSync(filePath) && filePath.match(/\.jsx?/);

const reducerExists = filePath => fs.existsSync(filePath) && filePath.match(/\.js/);

//  Check script name has valid syntax
const nameValidation = (name) => {
  if (name.match(/[!$%^&*()_+|~=`{}\[\]:";'<>?,.\s\/]/) || name[0] === '-') return false;
  return true;
};

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  indexExists,
  componentExists,
  idExists,
  reducerExists,
  nameValidation,
};
