const inquirer = require('inquirer');
const { test } = require('./lib/ques');

const testPerf = async () => {
  try {
    const user = await inquirer.prompt(test);
    return user;
  } catch (error) {
    throw error;
  }
};

testPerf();
