# react-testing-library-msw-training

This repository is designed to provide hands-on practice with Mock Service Worker (MSW) and React Testing Library. It includes various examples and exercises to help you master the skills needed to effectively mock API requests and write robust, reliable tests for your React applications.

# Manal's Documentation:

1. First ever thing I do is running
   ` npm test`
   which generated this error
   `    Cannot find module 'msw/node' from 'src/components/SignUp/SignUp.test.tsx'`
   Solution: `// jest.config.js
    module.exports = {
     testEnvironmentOptions: {
        customExportConditions: [''],
  },
}
`
