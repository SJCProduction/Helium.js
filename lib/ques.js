const files = require('./files');

const defaultResponse = 'oops! directory not found, please try again 🙀 🙀 🙀';

const questions = [
  {
    name: 'static',
    type: 'input',
    message: 'Enter the name of the static folder, (e.g. dist, build, public) ** NOTE: do not include the html file here ** :',
    validate(value) {
      if (files.directoryExists(value)) return true;
      return defaultResponse;
    },
  },
  {
    name: 'html',
    type: 'input',
    message: 'Enter the path of the html file containing the root div:',
    validate(value) {
      if (files.indexExists(value)) return true;
      return defaultResponse;
    },
  },
  {
    name: 'component',
    type: 'input',
    message: 'Enter the path of your root component file:',
    validate(value) {
      if (files.componentExists(value)) return true;
      return defaultResponse;
    },
  },
  {
    name: 'servername',
    type: 'input',
    message: 'Enter new name for server side file:',
    validate(value) {
      if (files.nameValidation(value)) return true;
      return 'Cannot contain symbols or "-" as first character';
    },
  },
  {
    name: 'script',
    type: 'input',
    message: 'Enter a npm script name to start your SSR server (e.g. start-SSR):',
    validate(value) {
      if (files.nameValidation(value)) return true;
      return 'Cannot contain symbols or "-" as first character';
    },
  },
];

module.exports = { questions };