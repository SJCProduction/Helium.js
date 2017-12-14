/*
  Copyright (c) 2017 Shachy Rivas @shachyjr, Chris Li @cli53, Julie Moon @juliemoon
  Licensed under the MIT License http://www.opensource.org/licenses/mit-license.php
*/

const files = require('./files');
const { hostPath } = require('./testPerf');

const defaultResponse = 'oops! directory not found, please try again 🙀 🙀 🙀';

const questions = [
  {
    name: 'requirements',
    type: 'confirm',
    message: 'Are you using Redux?',
    default: false,
    validate(value) {
      return value.length;
    },
  },
  {
    name: 'static',
    type: 'input',
    default: 'build',
    message: 'Enter the name of the build directory containing your bundle:',
    validate(value) {
      console.log('Hey');
      return files.directoryExists(value) ? true : defaultResponse;
    },
  },
  {
    name: 'html',
    type: 'input',
    default: 'index.html',
    message: 'Enter the path of the html file containing the root div:',
    validate(value) {
      return files.indexExists(value) ? true : defaultResponse;
    },
  },
  {
    name: 'id',
    type: 'input',
    message: 'Enter the id of the root div on which to render:',
    default: 'root',
    validate(value, user) {
      return files.idExists(value, user) ? true : 'Please enter correct id';
    },
  },
  {
    name: 'component',
    type: 'input',
    message: 'Enter the path of your root component file:',
    validate(value) {
      return files.componentExists(value) ? true : defaultResponse;
    },
  },
  {
    name: 'reducer',
    type: 'input',
    message: 'Enter path for your reducer directory:',
    when(user) {
      return user.requirements;
    },
    validate(value) {
      return files.directoryExists(value) ? true : defaultResponse;
    },
  },
  {
    name: 'servername',
    type: 'input',
    message: 'Enter new name for server side file:',
    default: 'HeliumServer',
    validate(value) {
      return files.nameValidation(value) ? true : 'Cannot contain symbols or "-" as first character';
    },
  },
];

const test = [
  {
    name: 'testPerf',
    type: 'confirm',
    default: true,
    message: 'Start performance test on SSR?',
    validate(value) {
      return value;
    },
  },
  {
    name: 'localhost',
    type: 'input',
    default: 3333,
    message: 'Enter localhost:',
    validate(value) {
      return hostPath(value);
    },
  },
];

module.exports = { questions, test };
