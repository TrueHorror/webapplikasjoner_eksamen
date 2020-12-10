
module.exports = {

  setupFilesAfterEnv: ['./tests/jest.setup'],

  testEnvironment: "node",

  testRegex: [
    '(test|spec).js'
  ],
}
