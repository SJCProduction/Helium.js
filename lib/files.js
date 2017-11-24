const fs = require('fs');
const path = require('path');

// we’ll want the name of the directory we’re working in, not the directory where the application resides. Making our console application work globally
const getCurrentDirectoryBase = () => path.basename(process.cwd());

// preferred method of checking whether a file or directory exists
const directoryExists = filePath => fs.existsSync(filePath);

// preferred method of checking whether a file or directory exists
const indexExists = filePath => fs.existsSync(filePath) && filePath.match(/\.html/);

// preferred method of checking whether a file or directory exists
const componentExists = filePath => fs.existsSync(filePath) && filePath.match(/\.jsx?/);

//  Check script name has valid syntax
const nameValidation = (name) => name.match(/[!$%^&*()_+|~=`{}\[\]:";'<>?,.\s\/]/) || name[0] === '-' ? false :  true; 



module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  indexExists,
  componentExists,
  nameValidation,
};
