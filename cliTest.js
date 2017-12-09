#! /usr/bin/env node
const inquirer = require('inquirer');
const { test } = require('./lib/ques');
const shell = require('shelljs');
const testPromise = require('./lib/testPerf');
console.log('DEFINITION', testPromise);

const testPerf = async () => {
  try {
    const user = await inquirer.prompt(test);
    if (user) {
      // let results = shell.exec('node ./node_modules/helium.js/lib/testPerf.js',{silence:true}).stdout;
      // console.log(results)

      // let results2 = testPromise().then(res => console.log(res));


      let results3 = await testPromise()

      console.log('RESULTS 3', results3)


      // let results2 = shell.exec('node ./node_modules/helium.js/lib/testPerf.js', {async:true});
      // results2.stdout.on('data', data => {
      //   console.log('THIS IS OUTSIDE TEST',data);
      // });

      // shell.exec('node ./node_modules/helium.js/lib/testPerf.js', (code, stdout, stderr) => {
      //   console.log('Exit code:', code);
      //   console.log('Program output:', stdout);
      //   console.log('Program stderr:', stderr);
      // });
    }
    
  } catch (error) {
    throw error;
  }
};

testPerf();
