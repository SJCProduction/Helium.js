const fs = require('fs');
const path = require('path');

module.exports = {
 
  getCurrentDirectoryBase() {
   // we’ll want the name of the directory we’re working in, not the directory where the application resides. Making our console application work globally
    return path.basename(process.cwd());
  },

  directoryExists(filePath) {
    try {
      //preferred method of checking whether a file or directory exists
      return fs.existsSync(filePath);
    } 
    catch (err) {
      return false;
    }
  }, 

  indexExists(filePath) {
    try {
      //preferred method of checking whether a file or directory exists
      const stats = fs.existsSync(filePath);
      return stats && filePath.match(/\.html/)

    } 
    catch (err) {
      return false;
    }
  },
  componentExists(filePath) {
    try {
      //preferred method of checking whether a file or directory exists
      const stats = fs.existsSync(filePath);
      return stats && filePath.match(/\.jsx?/)
          
    } 
    catch (err) {
      return false;
    }
  },    
  
};
