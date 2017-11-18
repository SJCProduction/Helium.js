var fs = require('fs');
var path = require('path');

module.exports = {
  // we’ll want the name of the directory we’re working in, not the directory where the application resides. Making our console application work globally
  getCurrentDirectoryBase() {
    //
    return path.basename(process.cwd());
  },

  directoryExists(filePath) {
    try {
      //preferred method of checking whether a file or directory exists
      const stats =  fs.statSync(filePath).isDirectory();
      return stats
    } catch (err) {
      console.log('does not exist')
      return false;
    }
  }
  
};
