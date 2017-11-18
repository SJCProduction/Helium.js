const chalk       = require('chalk');
const clear       = require('clear'); // clears the terminal screen
const CLI         = require('clui');
const inquirer    = require('inquirer');
const figlet      = require('figlet'); // creates ASCII art from text
const Preferences = require('preferences'); // manage CLI application encrypted preferences
const Spinner     = CLI.Spinner;
const touch       = require('touch'); // implementation of the *Nix touch command
const fs          = require('fs');
const _           = require('lodash');
const files       = require('./lib/files');

clear();
console.log(
  chalk.magenta(
    figlet.textSync('SJC', { horizontalLayout: 'full' })
  )
);


const getUserFiles = (callback) => {
  const questions = [
    {
      name: 'static',
      type: 'input',
      message: 'Enter the name of the static folder you want to render:',
      validate( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Enter the path of the static folder:';
        }
      }
    },
    {
      name: 'html',
      type: 'input',
      message: 'Enter the path of the index.html:',
      validate(value) {
        if (value.length) {
          return true;
        } else {
          return 'Path of the index.html React is mounted on:';
        }
      }
    }
  ];

   inquirer.prompt(questions).then(({ static, html }) => {
     // LOGIC TO FIND THE FILES USING USER INPUT PATHS
      console.log(static)
      const status = new Spinner('Creating SSR environment...');
      status.start();

      if (files.directoryExists(static)) {
        console.log(chalk.green(`Found a ${static} directory!`));
      }

      process.exit();
    

    // Spinner
    //  const status = new Spinner('Creating SSR environment...');
    //  status.start();
    //  var number = 10;
    //  setInterval(function () {
    //    number--;
    //    status.message('Exiting in ' + number + ' seconds...  ');
    //    if (number === 0) {
    //     process.stdout.write('\n');
    //     process.exit(0);
    //    }
    //  }, 1000)

  });
}

getUserFiles(function(){
  console.log(arguments);

});

const createServerFile = (callback) => {
  const fileName = null;

}






