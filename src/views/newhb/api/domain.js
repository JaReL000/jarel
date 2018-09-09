var chalk = require('chalk')

let domain = {
  dev: 'http://jinrapp.dev.jinr.com',
  pre: 'http://jinrapp.pre.jinr.com',
  beta: 'http://jinrapp.beta.jinr.com',
  prod: 'http://jinrapp.jinr.com'
}

console.log(chalk.cyan(domain[process.env.DOMAIN_ENV]))