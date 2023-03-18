const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

// const customJestConfig = {
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     moduleDirectories: ['node_modules', '<rootDir>/'],
//     testEnvironment: 'jest-environment-jsdom',
//     automock: false,
//     resetMocks: false,
// }
const customJestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: ['node_modules', '<rootDir>/'],
    setupFiles: ['./jest.setup.js'],
    automock: false,
    resetMocks: false,
}


module.exports = createJestConfig(customJestConfig)
