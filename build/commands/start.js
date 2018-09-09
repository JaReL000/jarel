const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { resolve } = require('path')
const chalk = require('chalk')

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Template name:',
    // validate (val) {
    //   if (tplList[val]) {
    //     return true
    //   } else if (val === '') {
    //     return 'Name is required!'
    //   } else if (!tplList[val]) {
    //     return 'This template doesn\'t exists.'
    //   }
    // }
  },
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    // validate (val) {
    //   if (val !== '') {
    //     return true
    //   }
    //   return 'Project name is required!'
    // }
  },
  {
    type: 'input',
    name: 'place',
    message: 'Where to init the project:',
    default: './'
  }
]

module.exports = prompt(question).then(({ name, project, place }) => {
  console.log(name, project, place);
  
})
