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
      const stats =  fs.existsSync(filePath);
      return stats
    } catch (err) {
      return false;
    }
  },

  indexExists(filePath){
    try {
      if(filePath)
      const stat = fs.existsSync(filePath)
      return stat
    } catch (err) {
      return false;
    }
  }
  
};
