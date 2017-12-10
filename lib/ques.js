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
      return value.length;
    },
  },
  {
    name: 'static',
    type: 'input',
    default: 'build',
    message: 'Enter the name of the build directory containing your bundle:',
    validate(value) {
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
  {
    name: 'script',
    type: 'input',
    default: 'start:helium',
    message: 'Enter a npm script name to start your SSR server:',
    validate(value) {
      return files.nameValidation(value) ? true : 'Cannot contain symbols or "-" as first character';
    },
  },
];

const test = [
  {
    name: 'testPerf',
    type: 'confirm',
    message: 'Start performance test on SSR?',
    validate(value) {
      return files.initTest(value);
    },
  },
];

module.exports = { questions, test };
