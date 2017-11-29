const fs = require('fs');
const path = require('path');

// we’ll want the name of the directory we’re working in, not the directory where the application resides. Making our console application work globally
const getCurrentDirectoryBase = () => path.basename(process.cwd());


const directoryExists = filePath => fs.existsSync(filePath);

const indexExists = filePath => fs.existsSync(filePath) && filePath.match(/\.html/);

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
  reducerExists,
  nameValidation,
};
