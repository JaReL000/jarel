const project = require('./project')
console.log(project.bucket);

module.exports = {
  accessKeyId: 'LTAIhAannwYNYy6N',
  accessKeySecret: 'Yu8gqu2bh9mJuedDOyt8wYNuQNuNuD',
  // jinrvipdev
  // bucket: "jinrfedev", // jinrfedev  jinrfepre jinrfebeta
  bucket: project.bucket,
  region: 'oss-cn-shenzhen',
}