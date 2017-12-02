const files = require('./files');


const defaultResponse = 'oops! directory not found, please try again 🙀 🙀 🙀';
// UNCOMMENT TO IMPLEMENT OTHER STATE MANAGEMENT TOOLS
// const addons = [
//   new inquirer.Separator('= State Management ='),
//   { name: 'Redux', checked: true },
//   { name: 'Flux' },
//   { name: 'MobX' },
//   { name: 'None of the above' },
// ];

const questions = [
  // {
  //   name: 'requirements',
  //   type: 'checkbox',
  //   message: 'Select all that apply:',
  //   choices: addons,
  //   default: addons[1],
  //   validate(value) {
  //     if (value.length) {
  //       return true;
  //     }
  //     return false;
  //   },
  // },
  {
    name: 'requirements',
    type: 'confirm',
    message: 'Are you using Redux?',
    default: false,
    validate(value) {
      if (value.length) {
        return true;
      }
      return false;
    },
  },
  {
    name: 'static',
    type: 'input',
    message: 'Enter the name of the build folder containing the webpack bundle, (e.g. dist, build) ** NOTE: do not include the html file here ** :',
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
    name: 'id',
    type: 'input',
    message: 'Enter the id of the root div on which to render:',
  },
  {
    name: 'reducer',
    type: 'input',
    message: 'Enter path for your reducer folder:',
    when(user) {
      // return user.requirements.includes('Redux');
      return user.requirements;
    },
    validate(value) {
      if (files.directoryExists(value)) return true;
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
